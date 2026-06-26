// ==========================================
// FTC Code Lab Engine — Phoenix Forge
// Custom Monaco Loader, 2D Canvas Simulator & Blocks UI
// ==========================================

(function() {
  let editor = null;
  let currentDecorations = [];
  let isRunning = false;
  let animFrameId = null;
  let currentPreset = 'basic';
  let isBlocksMode = false;
  let blocksList = []; // Array of active blocks

  // Virtual time & log container
  let startRealTime = 0;
  let virtualTimeOffset = 0;
  let logLines = [];

  // Canvas context
  let canvas = null;
  let ctx = null;

  // Simulator constants
  const TIME_SCALE = 0.8; // 1000ms in code = 800ms in sim
  const FIELD_SIZE = 400; // nominal size
  const ROBOT_W = 30;
  const ROBOT_H = 35;

  // Robot state
  let robot = {
    x: 200,
    y: 200,
    heading: -Math.PI / 2, // Facing up
    armAngle: 0,
    intaking: false,
    trail: [], // Array of {x, y}
    speed: 0,
    strafe: 0,
    turn: 0,
    outOfBounds: false
  };

  // Default block definitions for Blocks Mode
  const DEFAULT_BLOCKS = [
    { type: 'drive', speed: 0.8, strafe: 0, turn: 0 },
    { type: 'wait', ms: 1500 },
    { type: 'turn', degrees: 90 },
    { type: 'wait', ms: 500 },
    { type: 'drive', speed: 0.8, strafe: 0, turn: 0 },
    { type: 'wait', ms: 1000 },
    { type: 'stop' }
  ];

  // Preset Starter Code definitions
  const PRESETS = {
    basic: `// FTC TeleOp — Phoenix Forge Code Lab
// Управляй роботом с помощью команд ниже

public class MyTeleOp {
    
    // Инициализация робота
    public void init() {
        robot.setDriveMode("mecanum");
        robot.log("Робот инициализирован ✓");
    }
    
    // Основной цикл
    public void loop() {
        // Движение вперёд
        robot.drive(0.8, 0, 0);
        robot.wait(1500);
        
        // Поворот направо
        robot.turn(90);
        robot.wait(500);
        
        // Движение вперёд
        robot.drive(0.8, 0, 0);
        robot.wait(1000);
        
        // Остановка
        robot.stop();
        robot.log("Программа завершена ✓");
    }
}`,

    autonomous: `// Автономный режим — 30 секунд
public class AutonomousOp {
    public void runOpMode() {
        // Движение к центру поля
        robot.drive(0.6, 0, 0);
        robot.wait(2000);
        robot.stop();
        
        // Поворот к цели
        robot.turn(45);
        
        // Захват элемента
        robot.intake(true);
        robot.wait(1000);
        robot.intake(false);
        
        robot.log("Автономный режим завершён");
    }
}`,

    manipulator: `// Управление манипулятором — Сбор элементов
public class ArmControl {
    public void runOpMode() {
        // Поднимаем манипулятор
        robot.setArmPosition(45);
        robot.wait(1000);
        
        // Подезжаем к элементу
        robot.drive(0.5, 0, 0);
        robot.wait(800);
        robot.stop();
        
        // Включаем забор
        robot.intake(true);
        robot.wait(1500);
        robot.intake(false);
        
        // Опускаем манипулятор
        robot.setArmPosition(0);
        robot.wait(1000);
        robot.log("Элемент успешно собран!");
    }
}`,

    trajectory: `// Следование по сложной траектории
public class PathFollowing {
    public void runOpMode() {
        // Движение по диагонали (speed, strafe, turn)
        robot.drive(0.5, 0.5, 0);
        robot.wait(1200);
        
        // Круговой разворот в движении
        robot.drive(0.2, 0, 0.6);
        robot.wait(1800);
        
        // Остановка
        robot.stop();
        robot.log("Траектория пройдена ✓");
    }
}`
  };

  // Execution steps queue
  let executionQueue = [];
  let currentStepIdx = 0;
  let stepTimer = 0;
  let activeIntakeAngle = 0;

  // Initialize Code Lab View
  window.initCodeLab = function(lessonId) {
    isBlocksMode = (lessonId === '1.2');
    
    // Bind panels and setup HTML controls
    setupPanelControls();
    
    // Setup Exercise chips listeners
    setupPresetChips();

    // Setup Canvas
    setupCanvas();

    if (isBlocksMode) {
      document.getElementById('monaco-editor-container').style.display = 'none';
      document.getElementById('blocks-editor-container').style.display = 'block';
      document.getElementById('editor-panel-header').innerText = 'BLOCKS WORKSPACE';
      initBlocksEditor();
    } else {
      document.getElementById('monaco-editor-container').style.display = 'block';
      document.getElementById('blocks-editor-container').style.display = 'none';
      document.getElementById('editor-panel-header').innerText = 'CODE EDITOR';
      initMonacoEditor();
    }

    // Load initial simulator state
    resetSimulation();
    clearConsole();
    resetTests();
  };

  // Toggle tab contents
  function setupPanelControls() {
    const tabs = document.querySelectorAll('.panel-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const tabName = tab.getAttribute('data-tab');
        if (tabName === 'console') {
          document.getElementById('tab-console').style.display = 'flex';
          document.getElementById('tab-tests').style.display = 'none';
        } else {
          document.getElementById('tab-console').style.display = 'none';
          document.getElementById('tab-tests').style.display = 'flex';
        }
      });
    });

    // Run / Stop / Reset Buttons
    const btnRun = document.getElementById('btn-run');
    const btnStop = document.getElementById('btn-stop');
    const btnReset = document.getElementById('btn-reset');

    if (btnRun) btnRun.onclick = runSimulation;
    if (btnStop) btnStop.onclick = stopSimulation;
    if (btnReset) btnReset.onclick = () => {
      stopSimulation();
      resetSimulation();
      clearConsole();
      resetTests();
      logSystem("Симулятор сброшен.");
    };
  }

  // Setup Exercise presets click handlers
  function setupPresetChips() {
    const chips = document.querySelectorAll('.exercise-chip');
    chips.forEach(chip => {
      chip.onclick = () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const presetKey = chip.getAttribute('data-preset');
        currentPreset = presetKey;

        stopSimulation();
        resetSimulation();
        clearConsole();
        resetTests();

        if (isBlocksMode) {
          // Load default blocks on chip click
          blocksList = JSON.parse(JSON.stringify(DEFAULT_BLOCKS));
          renderBlocksList();
        } else {
          if (editor) {
            editor.setValue(PRESETS[presetKey]);
          }
        }
      };
    });
  }

  // Setup Canvas
  function setupCanvas() {
    canvas = document.getElementById('sim-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    // Make canvas square and responsive
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }

  function resizeCanvas() {
    if (!canvas) return;
    const parent = canvas.parentElement;
    const size = Math.min(parent.clientWidth - 32, 400);
    canvas.width = size;
    canvas.height = size;
    drawField();
  }

  // Draw FTC field on canvas
  function drawField() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;

    // Background #0d0d0e
    ctx.fillStyle = '#0d0d0e';
    ctx.fillRect(0, 0, w, h);

    // Grid lines every 40px
    ctx.strokeStyle = '#1e1e20';
    ctx.lineWidth = 1;
    for (let x = 40; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 40; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Center Line
    ctx.strokeStyle = '#28282c';
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.setLineDash([]);

    // Corner Squares
    // Blue Alliance Corners: top-left & bottom-left
    ctx.fillStyle = '#4d8cff';
    ctx.fillRect(0, 0, 30, 30);
    ctx.fillRect(0, h - 30, 30, 30);

    // Red Alliance Corners: top-right & bottom-right
    ctx.fillStyle = '#FF4D1C';
    ctx.fillRect(w - 30, 0, 30, 30);
    ctx.fillRect(w - 30, h - 30, 30, 30);

    // Draw robot trail
    ctx.fillStyle = 'rgba(255, 77, 28, 0.12)';
    robot.trail.forEach((pt, index) => {
      const age = robot.trail.length - index;
      const opacity = Math.max(0.01, 0.15 - age * 0.001);
      ctx.fillStyle = `rgba(255, 77, 28, ${opacity})`;
      ctx.beginPath();
      ctx.arc(pt.x * (w / FIELD_SIZE), pt.y * (h / FIELD_SIZE), 2, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw Robot
    drawRobot(w, h);
  }

  function drawRobot(w, h) {
    const rx = robot.x * (w / FIELD_SIZE);
    const ry = robot.y * (h / FIELD_SIZE);

    ctx.save();
    ctx.translate(rx, ry);
    ctx.rotate(robot.heading);

    // Robot trail dot accumulator
    if (isRunning && (animFrameId % 4 === 0)) {
      robot.trail.push({ x: robot.x, y: robot.y });
      if (robot.trail.length > 300) robot.trail.shift();
    }

    // Body Fill #FF4D1C 0.9, Border 2px solid #FF8C42
    ctx.fillStyle = 'rgba(255, 77, 28, 0.9)';
    ctx.strokeStyle = '#FF8C42';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(-ROBOT_W / 2, -ROBOT_H / 2, ROBOT_W, ROBOT_H);
    ctx.fill();
    ctx.stroke();

    // Direction indicator: triangle/arrow on front of robot, color #F0EDE8
    ctx.fillStyle = '#F0EDE8';
    ctx.beginPath();
    ctx.moveTo(0, -ROBOT_H / 2 + 3);
    ctx.lineTo(-6, -ROBOT_H / 2 + 12);
    ctx.lineTo(6, -ROBOT_H / 2 + 12);
    ctx.closePath();
    ctx.fill();

    // Intake rollers spinning dots
    if (robot.intaking) {
      activeIntakeAngle += 0.15;
      ctx.fillStyle = '#FF4D1C';
      
      const leftIntakeX = -ROBOT_W / 2 + 5;
      const rightIntakeX = ROBOT_W / 2 - 5;
      const intakeY = -ROBOT_H / 2;

      // Draw 3 tiny spinning circles on each side of the intake front edge
      for (let i = 0; i < 3; i++) {
        const angle = activeIntakeAngle + (i * Math.PI * 2 / 3);
        const lX = leftIntakeX + Math.cos(angle) * 4;
        const lY = intakeY + Math.sin(angle) * 4;
        const rX = rightIntakeX + Math.cos(-angle) * 4;
        const rY = intakeY + Math.sin(-angle) * 4;

        ctx.beginPath();
        ctx.arc(lX, lY, 2, 0, 2 * Math.PI);
        ctx.arc(rX, rY, 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    // Arm Extending: length 25px, color #FF8C42
    if (robot.armAngle !== 0) {
      ctx.strokeStyle = '#FF8C42';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      // Arm points out relative to robot's facing direction
      const armRad = (robot.armAngle - 90) * Math.PI / 180;
      ctx.lineTo(Math.cos(armRad) * 25, Math.sin(armRad) * 25);
      ctx.stroke();
    }

    ctx.restore();
  }

  // Monaco Editor Initialization
  function initMonacoEditor() {
    if (typeof require === 'undefined') return;

    require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' }});
    require(['vs/editor/editor.main'], function() {
      // Define Custom Theme matching site styles
      monaco.editor.defineTheme('ftc-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'keyword', foreground: 'FF4D1C', fontStyle: 'bold' },
          { token: 'string', foreground: 'FF8C42' },
          { token: 'comment', foreground: '4E4E56', fontStyle: 'italic' },
          { token: 'number', foreground: 'FF2D6B' },
          { token: 'type', foreground: 'F0EDE8' },
          { token: 'class', foreground: 'F0EDE8' }
        ],
        colors: {
          'editor.background': '#0d0d0e',
          'editor.foreground': '#F0EDE8',
          'editor.lineHighlightBackground': '#FF4D1C15',
          'editorLineNumber.foreground': '#4E4E56',
          'editorLineNumber.activeForeground': '#8A8A94',
        }
      });

      // Avoid creating multiple editors
      const container = document.getElementById('monaco-editor-container');
      container.innerHTML = '';

      editor = monaco.editor.create(container, {
        value: PRESETS[currentPreset] || PRESETS.basic,
        language: 'java',
        theme: 'ftc-dark',
        fontSize: 13,
        fontFamily: 'DM Mono, monospace',
        minimap: { enabled: false },
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true
      });
    });
  }

  // Visual Blocks Mode UI Implementation (Lesson 1.2)
  function initBlocksEditor() {
    const container = document.getElementById('blocks-editor-container');
    container.innerHTML = `
      <div class="blocks-editor-workspace">
        <div class="blocks-toolbox">
          <button class="blocks-toolbox-btn" id="btn-add-drive">+ Движение</button>
          <button class="blocks-toolbox-btn" id="btn-add-turn">+ Поворот</button>
          <button class="blocks-toolbox-btn" id="btn-add-wait">+ Пауза</button>
          <button class="blocks-toolbox-btn" id="btn-add-intake">+ Захват</button>
          <button class="blocks-toolbox-btn" id="btn-add-stop">+ Стоп</button>
        </div>
        <div class="blocks-workspace-list" id="blocks-workspace-list"></div>
        <div class="blocks-code-preview" id="blocks-code-preview"></div>
      </div>
    `;

    // Load default blocks
    blocksList = JSON.parse(JSON.stringify(DEFAULT_BLOCKS));
    renderBlocksList();

    // Register button handlers
    document.getElementById('btn-add-drive').onclick = () => {
      blocksList.push({ type: 'drive', speed: 0.8, strafe: 0, turn: 0 });
      renderBlocksList();
    };
    document.getElementById('btn-add-turn').onclick = () => {
      blocksList.push({ type: 'turn', degrees: 90 });
      renderBlocksList();
    };
    document.getElementById('btn-add-wait').onclick = () => {
      blocksList.push({ type: 'wait', ms: 1000 });
      renderBlocksList();
    };
    document.getElementById('btn-add-intake').onclick = () => {
      blocksList.push({ type: 'intake', active: true });
      renderBlocksList();
    };
    document.getElementById('btn-add-stop').onclick = () => {
      blocksList.push({ type: 'stop' });
      renderBlocksList();
    };
  }

  function renderBlocksList() {
    const listContainer = document.getElementById('blocks-workspace-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';

    blocksList.forEach((block, idx) => {
      const blockEl = document.createElement('div');
      blockEl.className = 'block-item';
      blockEl.id = `block-item-${idx}`;

      // Different colored borders per block type
      if (block.type === 'drive') blockEl.style.borderLeft = '4px solid #4d8cff';
      else if (block.type === 'turn') blockEl.style.borderLeft = '4px solid #FF8C42';
      else if (block.type === 'wait') blockEl.style.borderLeft = '4px solid #FF2D6B';
      else if (block.type === 'intake') blockEl.style.borderLeft = '4px solid #4CAF50';
      else if (block.type === 'stop') blockEl.style.borderLeft = '4px solid #FF4D1C';

      let innerHTML = `<div class="block-content">`;

      if (block.type === 'drive') {
        innerHTML += `
          <strong>ДВИЖЕНИЕ</strong>
          <span>вперёд:</span>
          <input type="number" step="0.1" min="-1" max="1" value="${block.speed}" onchange="window.updateBlock(${idx}, 'speed', this.value)">
          <span>бок:</span>
          <input type="number" step="0.1" min="-1" max="1" value="${block.strafe}" onchange="window.updateBlock(${idx}, 'strafe', this.value)">
          <span>вращение:</span>
          <input type="number" step="0.1" min="-1" max="1" value="${block.turn}" onchange="window.updateBlock(${idx}, 'turn', this.value)">
        `;
      } else if (block.type === 'turn') {
        innerHTML += `
          <strong>ПОВОРОТ</strong>
          <span>угол:</span>
          <input type="number" step="5" value="${block.degrees}" onchange="window.updateBlock(${idx}, 'degrees', this.value)" style="width: 50px;">
          <span>°</span>
        `;
      } else if (block.type === 'wait') {
        innerHTML += `
          <strong>ПАУЗА</strong>
          <span>время:</span>
          <input type="number" step="100" min="0" value="${block.ms}" onchange="window.updateBlock(${idx}, 'ms', this.value)" style="width: 70px;">
          <span>мс</span>
        `;
      } else if (block.type === 'intake') {
        innerHTML += `
          <strong>ЗАХВАТ</strong>
          <select onchange="window.updateBlock(${idx}, 'active', this.value === 'true')">
            <option value="true" ${block.active ? 'selected' : ''}>ВКЛ</option>
            <option value="false" ${!block.active ? 'selected' : ''}>ВЫКЛ</option>
          </select>
        `;
      } else if (block.type === 'stop') {
        innerHTML += `
          <strong>ОСТАНОВКА</strong>
        `;
      }

      innerHTML += `</div>`;
      innerHTML += `<button class="block-delete-btn" onclick="window.deleteBlock(${idx})">✕</button>`;

      blockEl.innerHTML = innerHTML;
      listContainer.appendChild(blockEl);
    });

    updateCodePreview();
  }

  // Global triggers for dynamic block inputs
  window.updateBlock = function(idx, key, val) {
    if (blocksList[idx]) {
      blocksList[idx][key] = parseFloat(val) || val;
      updateCodePreview();
    }
  };

  window.deleteBlock = function(idx) {
    blocksList.splice(idx, 1);
    renderBlocksList();
  };

  function updateCodePreview() {
    const preview = document.getElementById('blocks-code-preview');
    if (!preview) return;

    let code = `public class VisualBlocksOp {\n  public void run() {\n`;
    blocksList.forEach(block => {
      if (block.type === 'drive') {
        code += `    robot.drive(${block.speed}, ${block.strafe}, ${block.turn});\n`;
      } else if (block.type === 'turn') {
        code += `    robot.turn(${block.degrees});\n`;
      } else if (block.type === 'wait') {
        code += `    robot.wait(${block.ms});\n`;
      } else if (block.type === 'intake') {
        code += `    robot.intake(${block.active});\n`;
      } else if (block.type === 'stop') {
        code += `    robot.stop();\n`;
      }
    });
    code += `  }\n}`;
    preview.innerText = code;
  }

  // Parse Code and Build Sequential Animations Queue
  function buildQueueFromCode() {
    let codeText = '';
    if (isBlocksMode) {
      // Build from blocks list
      executionQueue = [];
      blocksList.forEach((block, idx) => {
        if (block.type === 'drive') {
          executionQueue.push({ type: 'drive', args: [block.speed, block.strafe, block.turn], blockIdx: idx });
        } else if (block.type === 'turn') {
          executionQueue.push({ type: 'turn', args: [block.degrees], blockIdx: idx });
        } else if (block.type === 'wait') {
          executionQueue.push({ type: 'wait', args: [block.ms], blockIdx: idx });
        } else if (block.type === 'intake') {
          executionQueue.push({ type: 'intake', args: [block.active], blockIdx: idx });
        } else if (block.type === 'stop') {
          executionQueue.push({ type: 'stop', args: [], blockIdx: idx });
        }
      });
      return;
    }

    if (!editor) return;
    codeText = editor.getValue();
    executionQueue = [];

    const lines = codeText.split('\n');
    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('//') || trimmed.startsWith('/*')) return;

      const driveMatch = trimmed.match(/robot\.drive\s*\(\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*\)/);
      const turnMatch = trimmed.match(/robot\.turn\s*\(\s*(-?\d*\.?\d+)\s*\)/);
      const waitMatch = trimmed.match(/robot\.wait\s*\(\s*(\d+)\s*\)/);
      const stopMatch = trimmed.match(/robot\.stop\s*\(\s*\)/);
      const armMatch = trimmed.match(/robot\.setArmPosition\s*\(\s*(-?\d*\.?\d+)\s*\)/);
      const intakeMatch = trimmed.match(/robot\.intake\s*\(\s*(true|false)\s*\)/);
      const logMatch = trimmed.match(/robot\.log\s*\(\s*["']([^"']*)["']\s*\)/);

      const lineNum = index + 1;

      if (driveMatch) {
        executionQueue.push({ type: 'drive', args: [parseFloat(driveMatch[1]), parseFloat(driveMatch[2]), parseFloat(driveMatch[3])], line: lineNum });
      } else if (turnMatch) {
        executionQueue.push({ type: 'turn', args: [parseFloat(turnMatch[1])], line: lineNum });
      } else if (waitMatch) {
        executionQueue.push({ type: 'wait', args: [parseInt(waitMatch[1])], line: lineNum });
      } else if (stopMatch) {
        executionQueue.push({ type: 'stop', args: [], line: lineNum });
      } else if (armMatch) {
        executionQueue.push({ type: 'setArmPosition', args: [parseFloat(armMatch[1])], line: lineNum });
      } else if (intakeMatch) {
        executionQueue.push({ type: 'intake', args: [intakeMatch[1] === 'true'], line: lineNum });
      } else if (logMatch) {
        executionQueue.push({ type: 'log', args: [logMatch[1]], line: lineNum });
      }
    });
  }

  // Execution & Simulation Flow Loop
  function runSimulation() {
    if (isRunning) return;

    // Show Stop, hide run
    document.getElementById('btn-run').style.display = 'none';
    document.getElementById('btn-stop').style.display = 'inline-flex';

    // Auto-switch to Console tab
    const tabs = document.querySelectorAll('.panel-tab');
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector('.panel-tab[data-tab="console"]').classList.add('active');
    document.getElementById('tab-console').style.display = 'flex';
    document.getElementById('tab-tests').style.display = 'none';

    resetSimulation();
    clearConsole();
    resetTests();

    // Parse commands
    buildQueueFromCode();

    if (executionQueue.length === 0) {
      logError("Нет команд для выполнения. Проверьте правильность написания robot.* в коде.");
      stopSimulation();
      return;
    }

    isRunning = true;
    currentStepIdx = 0;
    stepTimer = 0;

    startRealTime = performance.now();
    virtualTimeOffset = 0;

    // Initial Logs
    logSystem("Компиляция...");
    logSystem("Инициализация робота...", 50);
    logSystem("Запуск loop()...", 100);

    // Set virtual time offset to 100ms
    virtualTimeOffset = 100;

    // Start simulation frame loop
    animFrameId = requestAnimationFrame(updateFrame);
  }

  function stopSimulation() {
    if (!isRunning) return;
    isRunning = false;

    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }

    // Toggle buttons back
    document.getElementById('btn-run').style.display = 'inline-flex';
    document.getElementById('btn-stop').style.display = 'none';

    clearEditorHighlight();
    clearBlocksHighlight();

    // Log stop
    logError("Программа остановлена пользователем.");

    // Evaluate tests
    evaluateTests();
  }

  function resetSimulation() {
    robot.x = 200;
    robot.y = 200;
    robot.heading = -Math.PI / 2;
    robot.armAngle = 0;
    robot.intaking = false;
    robot.trail = [];
    robot.speed = 0;
    robot.strafe = 0;
    robot.turn = 0;
    robot.outOfBounds = false;

    currentStepIdx = 0;
    stepTimer = 0;

    clearEditorHighlight();
    clearBlocksHighlight();
    drawField();
  }

  // Animation Frame Loop
  function updateFrame(now) {
    if (!isRunning) return;

    // Check if we finished the queue
    if (currentStepIdx >= executionQueue.length) {
      // Done executing
      isRunning = false;
      document.getElementById('btn-run').style.display = 'inline-flex';
      document.getElementById('btn-stop').style.display = 'none';
      clearEditorHighlight();
      clearBlocksHighlight();
      logSuccess("Выполнение успешно завершено.");
      
      // Auto-switch to Tests tab
      const tabs = document.querySelectorAll('.panel-tab');
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelector('.panel-tab[data-tab="tests"]').classList.add('active');
      document.getElementById('tab-console').style.display = 'none';
      document.getElementById('tab-tests').style.display = 'flex';

      evaluateTests();
      return;
    }

    const step = executionQueue[currentStepIdx];
    
    // Highlight step
    if (isBlocksMode) {
      highlightBlock(step.blockIdx);
    } else {
      highlightEditorLine(step.line);
    }

    // Execute step
    let stepDuration = 0; // ms in simulation
    let isInstant = false;

    if (step.type === 'drive') {
      robot.speed = step.args[0];
      robot.strafe = step.args[1];
      robot.turn = step.args[2];
      isInstant = true;
    } else if (step.type === 'stop') {
      robot.speed = 0;
      robot.strafe = 0;
      robot.turn = 0;
      isInstant = true;
    } else if (step.type === 'intake') {
      robot.intaking = step.args[0];
      isInstant = true;
    } else if (step.type === 'log') {
      logRobot(step.args[0]);
      isInstant = true;
    } else if (step.type === 'setArmPosition') {
      // Smoothly animate arm to target position
      const targetArm = step.args[0];
      const diff = targetArm - robot.armAngle;
      if (Math.abs(diff) < 2) {
        robot.armAngle = targetArm;
        isInstant = true;
      } else {
        robot.armAngle += Math.sign(diff) * 2;
        stepDuration = 32; // run for 1 frame
      }
    } else if (step.type === 'turn') {
      // Smoothly rotate heading by relative degrees
      if (!step.initialized) {
        step.startHeading = robot.heading;
        step.targetHeading = robot.heading + (step.args[0] * Math.PI / 180);
        step.duration = 800; // 800ms turns
        step.elapsed = 0;
        step.initialized = true;
      }

      step.elapsed += 16.67; // approx ms per frame
      const progress = Math.min(1, step.elapsed / step.duration);
      robot.heading = step.startHeading + (step.targetHeading - step.startHeading) * progress;

      if (progress >= 1) {
        isInstant = true;
      } else {
        stepDuration = 16.67;
      }
    } else if (step.type === 'wait') {
      // Pause animation scaled by 0.8
      const targetDuration = step.args[0] * TIME_SCALE;
      if (stepTimer < targetDuration) {
        stepTimer += 16.67; // approx ms per frame
        stepDuration = 16.67;
      } else {
        stepTimer = 0;
        isInstant = true;
      }
    }

    // Move Robot
    const moveFactor = 2.0; // pixels per frame at speed = 1.0
    const turnFactor = 0.04; // radians per frame at turn = 1.0

    // Robot-centric kinematics
    let vx = (robot.speed * Math.cos(robot.heading) + robot.strafe * Math.cos(robot.heading + Math.PI / 2)) * moveFactor;
    let vy = (robot.speed * Math.sin(robot.heading) + robot.strafe * Math.sin(robot.heading + Math.PI / 2)) * moveFactor;
    
    robot.x += vx;
    robot.y += vy;
    
    // Constant rotation when active drive turn is applied
    if (step.type !== 'turn') {
      robot.heading += robot.turn * turnFactor;
    }

    // Clamping / field boundaries with out-of-bounds flag trigger
    const boundaryMargin = 15;
    if (robot.x < boundaryMargin || robot.x > FIELD_SIZE - boundaryMargin || 
        robot.y < boundaryMargin || robot.y > FIELD_SIZE - boundaryMargin) {
      robot.outOfBounds = true;
      robot.x = Math.max(boundaryMargin, Math.min(FIELD_SIZE - boundaryMargin, robot.x));
      robot.y = Math.max(boundaryMargin, Math.min(FIELD_SIZE - boundaryMargin, robot.y));
    }

    // Draw field and robot
    drawField();

    // Proceed to next step if instant or step timer expired
    if (isInstant) {
      if (step.type === 'wait') {
        virtualTimeOffset += step.args[0];
      } else {
        virtualTimeOffset += 20; // default command tick offset
      }
      currentStepIdx++;
      stepTimer = 0;
    }

    animFrameId = requestAnimationFrame(updateFrame);
  }

  // Editor Highlighting helpers
  function highlightEditorLine(lineNum) {
    if (!editor) return;
    currentDecorations = editor.deltaDecorations(currentDecorations, [
      {
        range: new monaco.Range(lineNum, 1, lineNum, 1),
        options: {
          isWholeLine: true,
          className: 'monaco-line-highlight'
        }
      }
    ]);
  }

  function clearEditorHighlight() {
    if (editor && currentDecorations.length > 0) {
      currentDecorations = editor.deltaDecorations(currentDecorations, []);
    }
  }

  function highlightBlock(blockIdx) {
    clearBlocksHighlight();
    const el = document.getElementById(`block-item-${blockIdx}`);
    if (el) {
      el.classList.add('active-block');
    }
  }

  function clearBlocksHighlight() {
    const blocks = document.querySelectorAll('.block-item');
    blocks.forEach(b => b.classList.remove('active-block'));
  }

  // Virtual Clock & Logs UI Helpers
  function formatLogTime(ms) {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const msecs = Math.floor(ms % 1000);
    return `[${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${msecs.toString().padStart(3, '0')}]`;
  }

  function addLogLine(text, className) {
    const container = document.getElementById('console-logs-container');
    if (!container) return;

    const currentMs = virtualTimeOffset;
    const timestamp = formatLogTime(currentMs);

    const logEl = document.createElement('div');
    logEl.className = `console-log-line ${className}`;
    logEl.innerText = `${timestamp} ${text}`;

    container.appendChild(logEl);
    
    // Auto-scroll
    const panelBody = container.parentElement;
    panelBody.scrollTop = panelBody.scrollHeight;
  }

  function logSystem(text, customMsOffset = 0) {
    if (customMsOffset > 0) {
      const prev = virtualTimeOffset;
      virtualTimeOffset = customMsOffset;
      addLogLine(text, 'console-system');
      virtualTimeOffset = prev;
    } else {
      addLogLine(text, 'console-system');
    }
  }

  function logRobot(text) {
    addLogLine(text, 'console-robot');
  }

  function logError(text) {
    addLogLine(text, 'console-error');
  }

  function logSuccess(text) {
    addLogLine(text, 'console-success');
  }

  function clearConsole() {
    const container = document.getElementById('console-logs-container');
    if (container) container.innerHTML = '';
  }

  // Auto-checks Suite (Tests Tab)
  function resetTests() {
    const container = document.getElementById('tests-list-container');
    if (!container) return;

    container.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 12px; color: #4E4E56; padding: 12px 0;">
        Запустите программу для прохождения тестов...
      </div>
    `;

    const badge = document.getElementById('score-badge');
    if (badge) {
      badge.innerText = 'ПРОЙДЕНО 0/5 ТЕСТОВ';
      badge.style.color = '#FF2D6B';
      badge.style.border = '1px solid rgba(255, 45, 107, 0.2)';
      badge.style.background = 'rgba(255, 45, 107, 0.05)';
    }
  }

  function evaluateTests() {
    const container = document.getElementById('tests-list-container');
    if (!container) return;

    let codeText = '';
    if (isBlocksMode) {
      // Build code text dynamically from active blocks
      blocksList.forEach(block => {
        if (block.type === 'drive') codeText += `robot.drive(${block.speed}, ${block.strafe}, ${block.turn});\n`;
        else if (block.type === 'turn') codeText += `robot.turn(${block.degrees});\n`;
        else if (block.type === 'wait') codeText += `robot.wait(${block.ms});\n`;
        else if (block.type === 'intake') codeText += `robot.intake(${block.active});\n`;
        else if (block.type === 'stop') codeText += `robot.stop();\n`;
      });
    } else {
      codeText = editor ? editor.getValue() : '';
    }

    // 1. Robot drives forward (robot.drive positive speed)
    const hasDriveForward = /robot\.drive\s*\(\s*(0\.\d+|[1-9]\d*\.?\d*)\s*,/.test(codeText);
    
    // 2. Contains stop called
    const hasStop = /robot\.stop\s*\(\s*\)/.test(codeText);

    // 3. Loops and execution contain pauses (no busy-waiting)
    const hasWait = /robot\.wait\s*\(\s*\d+\s*\)/.test(codeText);

    // 4. Bracket matching & Semicolon correctness check
    let syntaxCorrect = true;
    let braceCount = 0;
    let parenCount = 0;
    for (let c of codeText) {
      if (c === '{') braceCount++;
      else if (c === '}') braceCount--;
      else if (c === '(') parenCount++;
      else if (c === ')') parenCount--;
      
      if (braceCount < 0 || parenCount < 0) {
        syntaxCorrect = false;
      }
    }
    if (braceCount !== 0 || parenCount !== 0) {
      syntaxCorrect = false;
    }

    // Semicolon checks for robot.* lines
    const lines = codeText.split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('robot.') && !trimmed.endsWith(';')) {
        syntaxCorrect = false;
      }
    });

    // 5. Out of bounds check
    const stayInBounds = !robot.outOfBounds;

    // Build tests results arrays
    const tests = [
      {
        name: 'Робот движется вперёд',
        desc: 'Проверяет вызов robot.drive с положительной скоростью',
        passed: hasDriveForward
      },
      {
        name: 'Использован robot.stop()',
        desc: 'Проверяет наличие вызова robot.stop() для остановки',
        passed: hasStop
      },
      {
        name: 'Нет бесконечного цикла',
        desc: 'Проверяет наличие пауз в цикле управления (robot.wait)',
        passed: hasWait
      },
      {
        name: 'Корректный синтаксис Java',
        desc: 'Проверяет баланс скобок и точки с запятой в командах',
        passed: syntaxCorrect
      },
      {
        name: 'Робот не вышел за пределы поля',
        desc: 'Проверяет, что траектория оставалась внутри границ поля',
        passed: stayInBounds
      }
    ];

    let passedCount = 0;
    container.innerHTML = '';

    tests.forEach(test => {
      if (test.passed) passedCount++;

      const testRow = document.createElement('div');
      testRow.className = 'test-row';

      const statusIcon = test.passed ? '✓' : '✗';
      const statusClass = test.passed ? 'test-status-pass' : 'test-status-fail';

      testRow.innerHTML = `
        <div class="test-row-header">
          <span class="test-status-icon ${statusClass}">${statusIcon}</span>
          <span class="test-name">${test.name}</span>
        </div>
        <div class="test-desc">${test.desc}</div>
      `;
      container.appendChild(testRow);
    });

    // Update score badge and dynamically color it based on result
    const badge = document.getElementById('score-badge');
    if (badge) {
      badge.innerText = `ПРОЙДЕНО ${passedCount}/5 ТЕСТОВ`;
      if (passedCount === 5) {
        badge.style.color = '#FF8C42'; // green-orange
        badge.style.border = '1px solid rgba(255, 140, 66, 0.3)';
        badge.style.background = 'rgba(255, 140, 66, 0.05)';
      } else if (passedCount >= 3) {
        badge.style.color = '#FF4D1C'; // yellow-accent
        badge.style.border = '1px solid rgba(255, 77, 28, 0.3)';
        badge.style.background = 'rgba(255, 77, 28, 0.05)';
      } else {
        badge.style.color = '#FF2D6B'; // red
        badge.style.border = '1px solid rgba(255, 45, 107, 0.3)';
        badge.style.background = 'rgba(255, 45, 107, 0.05)';
      }
    }
  }

})();

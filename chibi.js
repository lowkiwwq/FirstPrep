/**
 * Chibi Character System for Phoenix Forge
 * Wraps everything in a try-catch block to prevent breaking the parent site.
 */
(function() {
  try {
    const CHIBI_SPRITES = {
      idle:    '/assets/chibi/chibi-idle.png?v=2',
      talking: '/assets/chibi/chibi-talking.png?v=2',
      happy:   '/assets/chibi/chibi-happy.png?v=2'
    };

    let currentSprite = 'idle';

    // Shared state function to update all active chibi images
    window.setChibiSprite = function(state) {
      if (currentSprite === state) return;
      currentSprite = state;
      
      document.querySelectorAll('.chibi-sprite-img').forEach(img => {
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = CHIBI_SPRITES[state];
          img.style.opacity = '1';
        }, 80);
      });
    };

    // MODE 1 — GLOBAL DRAGGABLE WIDGET
    const ChibiGlobal = {
      init() {
        // Create widget element
        const widget = document.createElement('div');
        widget.id = 'chibi-global';
        widget.innerHTML = `
          <img class="chibi-sprite-img" 
               src="/assets/chibi/chibi-idle.png" 
               id="chibi-global-img" />
          <button id="chibi-hide-btn" title="Скрыть">×</button>
        `;

        // Create show button element
        const showBtn = document.createElement('button');
        showBtn.id = 'chibi-show-btn';
        showBtn.title = 'Показать персонажа';
        showBtn.innerHTML = '🔥';

        document.body.appendChild(widget);
        document.body.appendChild(showBtn);

        this.setupDrag(widget);
        this.setupDoubleClick(widget);
        this.setupVisibility(widget, showBtn);
      },

      setupDrag(chibi) {
        let isDragging = false;
        let startX, startY, startLeft, startTop;

        // Restore saved position
        const saved = JSON.parse(localStorage.getItem('chibi_pos') || 'null');
        if (saved) {
          chibi.style.left   = saved.left;
          chibi.style.top    = saved.top;
          chibi.style.right  = 'unset';
          chibi.style.bottom = 'unset';
        }

        const onDragStart = (clientX, clientY) => {
          isDragging = true;
          startX = clientX; startY = clientY;
          const rect = chibi.getBoundingClientRect();
          startLeft = rect.left; startTop = rect.top;
          chibi.classList.add('chibi-dragging');
          window.setChibiSprite('happy');
        };

        const onDragMove = (clientX, clientY) => {
          if (!isDragging) return;
          let newLeft = Math.max(0, Math.min(
            startLeft + (clientX - startX),
            window.innerWidth - chibi.offsetWidth
          ));
          let newTop = Math.max(0, Math.min(
            startTop + (clientY - startY),
            window.innerHeight - chibi.offsetHeight
          ));
          chibi.style.left   = newLeft + 'px';
          chibi.style.top    = newTop  + 'px';
          chibi.style.right  = 'unset';
          chibi.style.bottom = 'unset';
        };

        const onDragEnd = () => {
          if (!isDragging) return;
          isDragging = false;
          chibi.classList.remove('chibi-dragging');
          localStorage.setItem('chibi_pos', JSON.stringify({
            left: chibi.style.left,
            top:  chibi.style.top
          }));
          setTimeout(() => window.setChibiSprite('idle'), 600);
        };

        // Mouse Events
        chibi.addEventListener('mousedown', e => {
          if (e.target.id === 'chibi-hide-btn') return;
          onDragStart(e.clientX, e.clientY);
          e.preventDefault();
        });
        document.addEventListener('mousemove', e => onDragMove(e.clientX, e.clientY));
        document.addEventListener('mouseup', onDragEnd);

        // Touch Events
        chibi.addEventListener('touchstart', e => {
          const t = e.touches[0];
          onDragStart(t.clientX, t.clientY);
        }, { passive: true });
        document.addEventListener('touchmove', e => {
          const t = e.touches[0];
          onDragMove(t.clientX, t.clientY);
        }, { passive: true });
        document.addEventListener('touchend', onDragEnd);
      },

      setupDoubleClick(chibi) {
        chibi.addEventListener('dblclick', () => {
          window.setChibiSprite('happy');
          chibi.style.animation = 'chibiJump 0.5s ease';
          setTimeout(() => {
            chibi.style.animation = '';
            window.setChibiSprite('idle');
          }, 1200);
        });
      },

      setupVisibility(chibi, showBtn) {
        const hideBtn = document.getElementById('chibi-hide-btn');
        
        hideBtn.addEventListener('click', () => {
          chibi.style.display = 'none';
          showBtn.style.display = 'flex';
          localStorage.setItem('chibi_visible', 'false');
        });

        showBtn.addEventListener('click', () => {
          chibi.style.display = 'block';
          showBtn.style.display = 'none';
          localStorage.setItem('chibi_visible', 'true');
        });

        // Restore visibility preference
        if (localStorage.getItem('chibi_visible') === 'false') {
          chibi.style.display = 'none';
          showBtn.style.display = 'flex';
        }
      }
    };

    // MODE 2 — VIDEO LESSON OVERLAY WITH AUDIO LIP-SYNC
    window.ChibiVideo = {
      audioCtx: null,
      analyser: null,
      source: null,
      rafId: null,
      mouthInterval: null,
      videoEl: null,
      chibiState: 'idle',
      happyLock: false,
      mouthToggle: false,
      silentFrames: 0,
      loudFrames: 0,
      dataArray: null,

      init(videoEl) {
        try {
          this.destroy(); // Tear down any active video states first
          this.videoEl = videoEl;

          // Hide global widget elements completely while video overlay is active
          const globalWidget = document.getElementById('chibi-global');
          if (globalWidget) globalWidget.style.display = 'none';
          const globalShowBtn = document.getElementById('chibi-show-btn');
          if (globalShowBtn) globalShowBtn.style.display = 'none';

          // Inject overlay inside video container
          const wrapper = videoEl.parentElement;
          if (!wrapper) return;

          const overlay = document.createElement('div');
          overlay.id = 'chibi-video-overlay';
          overlay.innerHTML = `
            <img class="chibi-sprite-img"
                 src="/assets/chibi/chibi-idle.png"
                 id="chibi-video-img" />
          `;
          wrapper.appendChild(overlay);

          // Configure Audio Analysis
          this.setupAudioAnalysis();
        } catch (err) {
          console.error("ChibiVideo init error:", err);
        }
      },

      setupAudioAnalysis() {
        try {
          const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
          if (!AudioCtxClass) {
            throw new Error("AudioContext not supported by this browser");
          }

          this.audioCtx = new AudioCtxClass();
          this.source = this.audioCtx.createMediaElementSource(this.videoEl);
          this.analyser = this.audioCtx.createAnalyser();
          this.analyser.fftSize = 256;
          this.analyser.smoothingTimeConstant = 0.6;
          
          this.source.connect(this.analyser);
          this.analyser.connect(this.audioCtx.destination);
          
          this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
          this.bindAudioEvents();
        } catch (err) {
          console.warn("AudioContext setup blocked or CORS error, falling back:", err);
          this.setupCorsFallback();
        }
      },

      bindAudioEvents() {
        this.onPlay = () => {
          try {
            if (this.audioCtx && this.audioCtx.state === 'suspended') {
              this.audioCtx.resume();
            }
          } catch (e) {
            console.error(e);
          }

          const overlay = document.getElementById('chibi-video-overlay');
          if (overlay) overlay.classList.add('chibi-visible');

          this.silentFrames = 0;
          this.loudFrames = 0;
          this.happyLock = false;
          this.chibiState = 'idle';

          if (this.rafId) cancelAnimationFrame(this.rafId);
          this.detectionLoop();
        };

        this.onPause = () => {
          if (this.rafId) cancelAnimationFrame(this.rafId);
          this.stopMouthAnimation();
          this.setState('idle');
        };

        this.onEnded = () => {
          if (this.rafId) cancelAnimationFrame(this.rafId);
          this.stopMouthAnimation();
          window.setChibiSprite('happy');
          setTimeout(() => window.setChibiSprite('idle'), 2000);
        };

        this.onWaiting = () => {
          this.setState('idle');
        };

        this.videoEl.addEventListener('play', this.onPlay);
        this.videoEl.addEventListener('pause', this.onPause);
        this.videoEl.addEventListener('ended', this.onEnded);
        this.videoEl.addEventListener('waiting', this.onWaiting);

        // If video is already playing when initialized
        if (!this.videoEl.paused) {
          this.onPlay();
        }
      },

      setupCorsFallback() {
        // CORS Fallback Mode — Toggle sprite based on timeupdate ticks
        this.onTimeUpdate = () => {
          if (this.videoEl && !this.videoEl.paused) {
            this.mouthToggle = !this.mouthToggle;
            window.setChibiSprite(this.mouthToggle ? 'talking' : 'idle');
          }
        };

        this.onFallbackPause = () => {
          window.setChibiSprite('idle');
        };

        this.onFallbackPlay = () => {
          const overlay = document.getElementById('chibi-video-overlay');
          if (overlay) overlay.classList.add('chibi-visible');
        };

        this.videoEl.addEventListener('timeupdate', this.onTimeUpdate);
        this.videoEl.addEventListener('pause', this.onFallbackPause);
        this.videoEl.addEventListener('play', this.onFallbackPlay);

        // Apply immediately if playing
        if (!this.videoEl.paused) {
          this.onFallbackPlay();
        }
      },

      startMouthAnimation(volume) {
        if (this.mouthInterval) clearInterval(this.mouthInterval);
        const rate = volume > 60 ? 80 : volume > 40 ? 120 : 160;
        this.mouthInterval = setInterval(() => {
          this.mouthToggle = !this.mouthToggle;
          window.setChibiSprite(this.mouthToggle ? 'talking' : 'idle');
        }, rate);
      },

      stopMouthAnimation() {
        if (this.mouthInterval) clearInterval(this.mouthInterval);
        this.mouthInterval = null;
      },

      setState(state) {
        if (this.chibiState === state) return;
        this.chibiState = state;
        if (state === 'talking') {
          this.startMouthAnimation(35);
        } else {
          this.stopMouthAnimation();
          window.setChibiSprite(state);
        }
      },

      detectionLoop() {
        if (!this.analyser || !this.dataArray) return;
        
        this.analyser.getByteFrequencyData(this.dataArray);
        const speechBins = Array.from(this.dataArray.slice(2, 20));
        const avgVolume = speechBins.reduce((a, b) => a + b, 0) / speechBins.length;

        const SILENCE_THRESHOLD = 15;
        const TALK_THRESHOLD    = 35;
        const LOUD_THRESHOLD    = 80;

        if (!this.happyLock) {
          if (avgVolume > LOUD_THRESHOLD && this.chibiState === 'talking') {
            this.happyLock = true;
            this.stopMouthAnimation();
            window.setChibiSprite('happy');
            this.chibiState = 'happy';
            setTimeout(() => {
              this.happyLock = false;
              this.setState(avgVolume > TALK_THRESHOLD ? 'talking' : 'idle');
            }, 1200);
          } else if (avgVolume > TALK_THRESHOLD) {
            this.silentFrames = 0;
            this.loudFrames++;
            if (this.loudFrames >= 3 && this.chibiState !== 'talking') {
              this.setState('talking');
            }
          } else if (avgVolume < SILENCE_THRESHOLD) {
            this.loudFrames = 0;
            this.silentFrames++;
            if (this.silentFrames >= 8 && this.chibiState !== 'idle') {
              this.setState('idle');
            }
          }
        }

        this.rafId = requestAnimationFrame(() => this.detectionLoop());
      },

      destroy() {
        try {
          // Remove overlay
          const overlay = document.getElementById('chibi-video-overlay');
          if (overlay) overlay.remove();

          // Cancel loop & intervals
          if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
          }
          this.stopMouthAnimation();

          // Unbind events
          if (this.videoEl) {
            if (this.onPlay) this.videoEl.removeEventListener('play', this.onPlay);
            if (this.onPause) this.videoEl.removeEventListener('pause', this.onPause);
            if (this.onEnded) this.videoEl.removeEventListener('ended', this.onEnded);
            if (this.onWaiting) this.videoEl.removeEventListener('waiting', this.onWaiting);

            if (this.onTimeUpdate) this.videoEl.removeEventListener('timeupdate', this.onTimeUpdate);
            if (this.onFallbackPause) this.videoEl.removeEventListener('pause', this.onFallbackPause);
            if (this.onFallbackPlay) this.videoEl.removeEventListener('play', this.onFallbackPlay);

            this.videoEl = null;
          }

          // Disconnect Web Audio nodes
          if (this.source) {
            this.source.disconnect();
            this.source = null;
          }
          if (this.analyser) {
            this.analyser.disconnect();
            this.analyser = null;
          }
          if (this.audioCtx) {
            if (this.audioCtx.state !== 'closed') {
              this.audioCtx.close();
            }
            this.audioCtx = null;
          }

          // Restore Global Widget
          const isVisible = localStorage.getItem('chibi_visible') !== 'false';
          const globalChibi = document.getElementById('chibi-global');
          const showBtn = document.getElementById('chibi-show-btn');

          if (globalChibi) {
            globalChibi.style.display = isVisible ? 'block' : 'none';
          }
          if (showBtn) {
            showBtn.style.display = isVisible ? 'none' : 'flex';
          }
        } catch (e) {
          console.error("ChibiVideo destroy error:", e);
        }
      }
    };

    // DOMContentLoaded Hook
    document.addEventListener('DOMContentLoaded', () => {
      ChibiGlobal.init();

      // MutationObserver automatically handles video node mounting and unmounting
      const observer = new MutationObserver(() => {
        const videoEl = document.querySelector('video');
        if (videoEl) {
          if (window.ChibiVideo.videoEl !== videoEl) {
            window.ChibiVideo.init(videoEl);
          }
        } else if (window.ChibiVideo.videoEl) {
          window.ChibiVideo.destroy();
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    });

  } catch (globalErr) {
    console.error("Chibi system global script error:", globalErr);
  }
})();

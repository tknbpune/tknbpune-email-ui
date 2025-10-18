<script>
    let autoReply = false;
    const toggleBtn = document.getElementById('auto-reply-toggle');
    const previewBody = document.getElementById('preview-body');


    toggleBtn.onclick = () => {
      autoReply = !autoReply;
      toggleBtn.textContent = "Auto-reply: " + (autoReply ? "ON" : "OFF");
    };


    document.getElementById('send').onclick = () => {
      const to = document.getElementById('to').value;
      const subject = document.getElementById('subject').value;


      if(autoReply){
        const replyHTML = `
          <div class="auto-reply">
            <p>Dear Sender,</p>
            <p>Thank you for reaching out to <strong>TKNB Pune</strong>.<br>
            Your email has been received, and our team will review it and respond as soon as possible.</p>
            <p>For urgent matters, please call us at 
              <a href="tel:+919511706433">+91 9511706433</a>.
            </p>
            <p>Best regards,<br>
            <strong>TKNB Pune Team</strong><br>
            <a href="mailto:info@tknbpune.org">info@tknbpune.org</a></p>
          </div>
        `;
        previewBody.innerHTML = replyHTML;
      } else {
        previewBody.textContent = document.getElementById('body').value;
      }
    };
  document.getElementById('send').onclick = () => {
  const to = document.getElementById('to').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const body = document.getElementById('body').value.trim();


  if(!to || !subject || !body){
    alert("⚠️ Please fill in all fields before sending!");
    return;
  }
  // continue with auto-reply or preview...
};


  const siteBtn = document.getElementById("site-toggle");
  const siteWrapper = document.getElementById("site-wrapper");
  const toggleIcon = document.getElementById("toggle-icon");


  siteBtn.onclick = () => {
    const isHidden = siteWrapper.style.display === "none";


    siteWrapper.style.display = isHidden ? "block" : "none";


    // Swap icon depending on state
    toggleIcon.src = isHidden ? "3Dpng-open.png" : "3Dpng.png";
    toggleIcon.alt = isHidden ? "Close Mail UI" : "Open Mail UI";
  };
</script>


<script>
  const video = document.getElementById('webcam');
  const canvas = document.getElementById('snapshot');
  const context = canvas.getContext('2d');
  const capturedImage = document.getElementById('capturedImage');
  const form = document.getElementById('uploadForm');
  const qualitySelect = document.getElementById('qualitySelect');


  let capturedBlob = null;
  let stream = null;


  // Webcam quality presets
  const qualityConstraints = {
    auto: { video: true },
    high: {
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        frameRate: { ideal: 30 }
      }
    },
    medium: {
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        frameRate: { ideal: 24 }
      }
    },
    low: {
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        frameRate: { ideal: 15 }
      }
    }
  };


  // Optional: Show camera permission message (uses SweetAlert2 if available)
  async function showPermissionNotice() {
    if (typeof Swal !== 'undefined') {
      await Swal.fire({
        title: '📸 Camera Permission Needed',
        text: 'This site needs access to your webcam. Please allow it in your browser when prompted.',
        icon: 'info',
        confirmButtonText: 'Continue',
        allowOutsideClick: false
      });
    } else {
      alert('This site will ask to access your webcam. Please allow it.');
    }
  }


  // Start webcam based on quality setting
  async function startWebcam() {
    const quality = qualitySelect.value;
    const constraints = qualityConstraints[quality] || qualityConstraints.auto;


    // Stop any existing stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }


    try {
      await showPermissionNotice();
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;
    } catch (err) {
      console.error("Webcam access error:", err);
      alert("❌ Unable to access webcam. Please allow access.");
    }
  }


  // Restart webcam when quality changes
  qualitySelect.addEventListener('change', () => {
    startWebcam();
  });


  // Capture photo from webcam
  function capturePhoto() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');


    // Display preview
    capturedImage.src = imageData;
    capturedImage.style.display = 'block';


    // Convert base64 to Blob
    const byteString = atob(imageData.split(',')[1]);
    const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    capturedBlob = new Blob([ab], { type: mimeString });
  }


  // Form submission with webcam image and file uploads
  form.addEventListener('submit', function (e) {
    e.preventDefault();


    const formData = new FormData(form);


    // Include webcam image if available
    if (capturedBlob) {
      formData.append('webcamFile', capturedBlob, 'webcam-capture.png');
    }


    // Submit using fetch
    fetch(form.action, {
      method: 'POST',
      body: formData
    })
    .then(res => {
      if (res.ok) {
        alert('✅ Upload successful!');
        form.reset();
        capturedImage.style.display = 'none';
      } else {
        alert('❌ Upload failed.');
      }
    })
    .catch(err => {
      console.error('Upload error:', err);
      alert('❌ Upload error.');
    });
  });


  // Start webcam on page load
  window.addEventListener('DOMContentLoaded', startWebcam);
</script>


<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>


<script>
  gsap.from("#main-footer", {
    opacity: 0,
    y: 80,
    scale: 0.9,
    duration: 1.5,
    ease: "elastic.out(1, 0.75)",
    delay: 0.5
  });


  // Optional glow loop effect
  gsap.to("#main-footer", {
    boxShadow: "0 0 25px rgba(11, 116, 222, 0.5)",
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    ease: "sine.inOut",
    delay: 2
  });
</script>


<script>
  function changeTextColor(color) {
    document.body.style.color = color;


    // Update all inputs and textareas to match
    document.querySelectorAll('input, textarea, select, button, h1, h2, h3, h4, h5, h6, p, span, a, label').forEach(el => {
      el.style.color = color;
    });
  }
</script>
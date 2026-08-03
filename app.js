// 验真派官网 · 交互逻辑
(function () {
  "use strict";

  // ---- 移动端菜单 ----
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") navLinks.classList.remove("open");
    });
  }

  // ---- 滚动渐显 ----
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // ---- 试运营意向表单（本地保存 + 成功反馈）----
  var form = document.getElementById("waitlistForm");
  var msg = document.getElementById("formMsg");
  if (form) {
    var nameEl = form.querySelector('input[name="name"]');
    var contactEl = form.querySelector('input[name="contact"]');
    var categoryEl = form.querySelector('select[name="category"]');
    var motivationEl = form.querySelector('textarea[name="motivation"]');
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = {
        name: nameEl.value.trim(),
        contact: contactEl.value.trim(),
        category: categoryEl.value,
        motivation: motivationEl.value.trim(),
        ts: new Date().toISOString(),
      };
      if (!data.name || !data.contact) {
        msg.className = "form-msg err";
        msg.textContent = "请填写称呼和联系方式。";
        return;
      }
      try {
        var key = "yanzhen_waitlist";
        var list = JSON.parse(localStorage.getItem(key) || "[]");
        list.push(data);
        localStorage.setItem(key, JSON.stringify(list));
        form.reset();
        msg.className = "form-msg ok";
        msg.textContent = "已收到，感谢！试运营开放时我们会优先联系你。（本地已记录你的意向）";
      } catch (err) {
        msg.className = "form-msg err";
        msg.textContent = "提交失败，请稍后重试或直接通过 GitHub 联系我们。";
      }
    });
  }
})();

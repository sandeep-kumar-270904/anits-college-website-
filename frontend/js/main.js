document.querySelectorAll("nav .nav-links a").forEach(link => {
    link.addEventListener("click", function() {
        document.querySelectorAll("nav .nav-links a").forEach(a => a.classList.remove("active"));
        this.classList.add("active");
    });
});

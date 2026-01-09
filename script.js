// 1. Initialize Custom Cursor
const cursor = document.createElement('div');
const follower = document.createElement('div');
cursor.classList.add('cursor');
follower.classList.add('cursor-follower');
document.body.appendChild(cursor);
document.body.appendChild(follower);

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
    gsap.to(follower, { x: e.clientX - 15, y: e.clientY - 15, duration: 0.3 });
    
    // Background blob follows mouse slowly
    gsap.to('.bg-blob', {
        x: e.clientX - 250,
        y: e.clientY - 250,
        duration: 2,
        ease: "power2.out"
    });
});

// 2. Typewriter Effect
const text = "Android Developer | UI Designer | Tech Enthusiast";
let i = 0;
function typeWriter() {
    if (i < text.length) {
        document.querySelector(".typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// 3. Scroll Reveal for Sections
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            gsap.from(entry.target, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power4.out"
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => observer.observe(section));

window.onload = typeWriter;

// 4. Magnetic Button
const btn = document.querySelector('.hero-text button');
btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
});
btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
});
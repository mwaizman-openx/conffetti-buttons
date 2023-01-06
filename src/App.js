import React from 'react';
import './style.css';
import gsap from 'gsap';
import Physics2DPlugin from 'gsap/Physics2DPlugin';

gsap.registerPlugin(Physics2DPlugin);

const Button = () => {
  const handleMouseMove = (e, button, bounding) => {
    let dy = (e.clientY - bounding.top - bounding.height / 2) / -1;
    let dx = (e.clientX - bounding.left - bounding.width / 2) / 10;

    dy = dy > 10 ? 10 : dy < -10 ? -10 : dy;
    dx = dx > 4 ? 4 : dx < -4 ? -4 : dx;

    button.style.setProperty('--rx', dy);
    button.style.setProperty('--ry', dx);
  };

  const handleMouseLeave = (button) => {
    button.style.setProperty('--rx', 0);
    button.style.setProperty('--ry', 0);
  };

  const handleClick = (button) => {
    button.classList.add('success');
    gsap.to(button, {
      '--icon-x': -3,
      '--icon-y': 3,
      '--z-before': 0,
      duration: 0.2,
      onComplete() {
        particles(button.querySelector('.emitter'), 100, -4, 6, -80, -50);
        gsap.to(button, {
          '--icon-x': 0,
          '--icon-y': 0,
          '--z-before': -6,
          duration: 1,
          ease: 'elastic.out(1, .5)',
          onComplete() {
            button.classList.remove('success');
          },
        });
      },
    });
  };

  return (
    <button
      className="button"
      onMouseMove={(e) =>
        handleMouseMove(e, this, this.getBoundingClientRect())
      }
      onMouseLeave={() => handleMouseLeave(this)}
      onClick={() => handleClick(this)}
    >
      <div className="icon">
        <div className="cannon"></div>
        <div className="confetti">
          <svg viewBox="0 0 18 16">
            <polyline points="1 10 4 7 4 5 6 1" />
            <path d="M4,13 C5.33333333,9 7,7 9,7 C11,7 12.3340042,6 13.0020125,4" />
            <path d="M6,15 C7.83362334,13.6666667 9.83362334,12.6666667 12,12 C14.1663767,11.3333333 15.8330433,9.66666667 17,7" />
          </svg>
          <div className="emitter"></div>
        </div>
      </div>
    </button>
  );
};

function particles(parent, quantity, x, y, minAngle, maxAngle) {
  let colors = ['#FFFF04', '#EA4C89', '#892AB8', '#4AF2FD'];
  for (let i = quantity - 1; i >= 0; i--) {
    let angle = gsap.utils.random(minAngle, maxAngle),
      velocity = gsap.utils.random(70, 140),
      dot = document.createElement('div');
    dot.style.setProperty('--b', colors[Math.floor(gsap.utils.random(0, 4))]);
    parent.appendChild(dot);
    gsap.set(dot, {
      opacity: 0,
      x: x,
      y: y,
      scale: gsap.utils.random(0.4, 0.7),
    });
    gsap
      .timeline({
        onComplete() {
          dot.remove();
        },
      })
      .to(
        dot,
        {
          duration: 0.05,
          opacity: 1,
        },
        0
      )
      .to(
        dot,
        {
          duration: 1.8,
          rotationX: -gsap.utils.random(720, 1440),
          rotationZ: +gsap.utils.random(720, 1440),
          physics2D: {
            angle: angle,
            velocity: velocity,
            gravity: 120,
          },
        },
        0
      )
      .to(
        dot,
        {
          duration: 1,
          opacity: 0,
        },
        0.8
      );
  }
}

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <Button />
    </div>
  );
}

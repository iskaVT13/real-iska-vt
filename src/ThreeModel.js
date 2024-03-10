// src/ThreeMap.js
import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import './Three.css';

const ThreeMap = () => {
  const cube = useMemo(() => {
    const cubeGeometry = new THREE.BoxGeometry();
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    return new THREE.Mesh(cubeGeometry, cubeMaterial);
  }, []);

  const mount = useRef();

  const changeColor = useCallback(() => {
    const newColor = new THREE.Color(Math.random(), Math.random(), Math.random());
    cube.material.color = newColor;
  }, [cube]);

  useEffect(() => {
    // Set up scene
    const scene = new THREE.Scene();

    // Set up renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.current.appendChild(renderer.domElement);

    // Add cube to scene
    scene.add(cube);

    // Set up camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Render scene
      renderer.render(scene, camera);
    };

    // Start animation
    animate();

    // Clean up
    return () => {
      scene.remove(cube);
      renderer.dispose();
    };
  }, [cube]);

  return (
    <div className="three-map-container">
      <div className="three-map" ref={mount} />
      <button className="change-color-button" onClick={changeColor}>
        Change Color
      </button>
    </div>
  );
};

export default ThreeMap;

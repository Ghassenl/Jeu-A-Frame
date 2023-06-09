let nextLevel = 'index.html';



const shoot = () => {
    const bullet = document.createElement('a-sphere');
    let pos = myCamera.getAttribute("position");
    bullet.setAttribute("position", pos);
    bullet.setAttribute("velocity", getDirection(myCamera,30));
    bullet.setAttribute("dynamic-body", true);
    bullet.setAttribute("radius", 0.5);
    bullet.setAttribute("color", "red");
    myScene.appendChild(bullet);
    bullet.addEventListener('collide', shootCollided);
};

const teleport = () => {
    const bullet = document.createElement('a-torus');
    let pos = myCamera.getAttribute("position");
    bullet.setAttribute("position", pos);
    bullet.setAttribute("velocity", getDirection(myCamera,30));
    bullet.setAttribute("dynamic-body", true);
    bullet.setAttribute("radius", 0.5);
    bullet.setAttribute("arc", 360);
    bullet.setAttribute("radius-tubular", 0.1);
    bullet.setAttribute("rotation", { x: 90, y: 90, z:0});
    bullet.setAttribute("color", "limegreen");
    myScene.appendChild(bullet);
    bullet.addEventListener('collide', teleportCollided);
}

const shootCollided = event => {
    if(event.detail.body.el.id === 'floor')
    {
        event.detail.target.el.removeEventListener('collide', shootCollided);
        myScene.removeChild(event.detail.target.el);
    }
    else if (event.detail.body.el.className === 'target')
    {
        event.detail.target.el.removeEventListener('collide', shootCollided);
        myScene.removeChild(event.detail.target.el);
        myScene.removeChild(event.detail.body.el);
    }

    if(document.querySelectorAll('.target').length === 0)
    {
        location.href = nextLevel;
    }
};

const teleportCollided = event => {
    if (event.detail.body.el.id === 'floor')
    {
        event.detail.target.el.removeEventListener('collide', teleportCollided);
        let pos = event.detail.target.el.getAttribute('position');
        myScene.removeChild(event.detail.target.el);
        myCamera.setAttribute('position', { x: pos.x, y: 2, z: pos.z});
    }
}

document.onkeydown = event => {
    if(event.which == 32) // Spacebar
    {
        shoot();
    }
    else if (event.which == 67) // C key
    {
        teleport();
    }
};


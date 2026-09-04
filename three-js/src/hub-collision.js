// Resolve the player's circular footprint against inexpensive local-space hub
// volumes. The art is one baked mesh, so these volumes provide collision
// without adding render objects or raycasts.
export function resolveHubCollision(position, colliders, origin, radius=.62) {
  let changed=false;
  for(let pass=0;pass<4;pass++) {
    let moved=false;
    for(const collider of colliders) {
      const cx=origin.x+collider.x,cz=origin.z+collider.z;
      if(collider.kind==='circle') {
        let dx=position.x-cx,dz=position.z-cz;
        const limit=radius+collider.radius,dist=Math.hypot(dx,dz);
        if(dist>=limit)continue;
        if(dist<1e-5){position.x=cx+limit;position.z=cz;changed=moved=true;continue;}
        const scale=limit/dist;
        position.x=cx+dx*scale;position.z=cz+dz*scale;
      } else {
        const cos=Math.cos(collider.turn||0),sin=Math.sin(collider.turn||0);
        const dx=position.x-cx,dz=position.z-cz;
        let x=dx*cos+dz*sin,z=-dx*sin+dz*cos;
        const hx=collider.width/2+radius,hz=collider.depth/2+radius;
        if(Math.abs(x)>=hx||Math.abs(z)>=hz)continue;
        const px=hx-Math.abs(x),pz=hz-Math.abs(z);
        if(px<pz)x=(x<0?-1:1)*hx;else z=(z<0?-1:1)*hz;
        position.x=cx+x*cos-z*sin;position.z=cz+x*sin+z*cos;
      }
      changed=moved=true;
    }
    if(!moved)break;
  }
  return changed;
}

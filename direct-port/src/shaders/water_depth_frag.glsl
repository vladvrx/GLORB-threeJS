vec3 wColor=gl_FragColor.xyz-wet*0.09;vec3 underwaterColor=(wColor*waterTopColor)*UNDERWATER_MULT+0.4;
#ifdef IS_MAP_MODE
if(hasWater>0.9999){discard;}
#else
wColor=mix(wColor,underwaterColor,hasWater*0.8);wColor=mix(wColor,waterColor,hasWater*waterDepth);float waterStreak=smoothstep(0.15,0.0,abs(sin(vWorldPos.x*0.07+vWorldPos.z*2.8+time*0.4)));wColor=mix(wColor,vec3(0.),hasWater*waterStreak*0.55);wColor=mix(wColor,vec3(0.),hasFoam);
#endif
#if defined(IS_BIOME_TESTLAB)
float d=distance(vWorldPos.xz,vec2(0.));wColor=mix(wColor,gl_FragColor.xyz,step(40.,d));
#endif
gl_FragColor.xyz=vec3(wColor);

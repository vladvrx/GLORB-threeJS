import { HA as n, DA as r, OM as l, CM as h, CC as y, Zx as b, sP as T, EC as O, HC as P, lB as A, hB as I, iA as R, sA as k, rC as L, AC as V, UA as H, Ww as xe, dD as Ae, ND as Ie, fD as Ce, MD as Re, BD as ke, kD as De, Ok as Le, aA as Ee, oA as Fe, jD as Ue, vD as ze, qw as Be, Nw as Ne, aI as je, yC as Ve, $B as He, Lk as We, tL as Ge, OB as qe, iI as Ye, eI as Ke, nI as Xe, hI as $e, YE as Ze, uP as Je, kA as Qe, RP as et, $S as tt, oD as st, RB as it, UB as ot, Hw as at, Gw as nt, jw as rt, Vw as lt, Fw as ct, Uw as ht, ZS as ut, jx as dt, iM as pt, rD as ft, nD as mt, sD as gt, lM as yt, Xk as bt, HD as vt } from "./three-r150.js";

function Ta() {
  let e = {};
  return {
    get: function (t) {
      return e[t];
    },
    add: function (t, s) {
      e[t] = s;
    },
    remove: function (t) {
      delete e[t];
    },
    removeAll: function () {
      e = {};
    }
  };
}
const Oa = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: "KHR_materials_pbrSpecularGlossiness",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression"
};
class Pa {
  constructor(e) {
    this.parser = e, this.name = Oa.KHR_LIGHTS_PUNCTUAL, this.cache = {
      refs: {},
      uses: {}
    };
  }
  _markDefs() {
    const e = this.parser,
      t = this.parser.json.nodes || [];
    for (let s = 0, i = t.length; s < i; s++) {
      const i = t[s];
      i.extensions && i.extensions[this.name] && void 0 !== i.extensions[this.name].light && e._addNodeRef(this.cache, i.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const t = this.parser,
      s = "light:" + e;
    let i = t.cache.get(s);
    if (i) return i;
    const o = t.json,
      a = ((o.extensions && o.extensions[this.name] || {}).lights || [])[e];
    let n;
    const r = new V(16777215);
    void 0 !== a.color && r.fromArray(a.color);
    const l = void 0 !== a.range ? a.range : 0;
    switch (a.type) {
      case "directional":
        n = new De(r), n.target.position.set(0, 0, -1), n.add(n.target);
        break;
      case "point":
        n = new ke(r), n.distance = l;
        break;
      case "spot":
        n = new Re(r), n.distance = l, a.spot = a.spot || {}, a.spot.innerConeAngle = void 0 !== a.spot.innerConeAngle ? a.spot.innerConeAngle : 0, a.spot.outerConeAngle = void 0 !== a.spot.outerConeAngle ? a.spot.outerConeAngle : Math.PI / 4, n.angle = a.spot.outerConeAngle, n.penumbra = 1 - a.spot.innerConeAngle / a.spot.outerConeAngle, n.target.position.set(0, 0, -1), n.add(n.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + a.type);
    }
    return n.position.set(0, 0, 0), n.decay = 2, void 0 !== a.intensity && (n.intensity = a.intensity), n.name = t.createUniqueName(a.name || "light_" + e), i = Promise.resolve(n), t.cache.add(s, i), i;
  }
  createNodeAttachment(e) {
    const t = this,
      s = this.parser,
      i = s.json.nodes[e],
      o = (i.extensions && i.extensions[this.name] || {}).light;
    return void 0 === o ? null : this._loadLight(o).then(function (e) {
      return s._getNodeRef(t.cache, o, e);
    });
  }
}
class Aa {
  constructor() {
    this.name = Oa.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return y;
  }
  extendParams(e, t, s) {
    const i = [];
    e.color = new V(1, 1, 1), e.opacity = 1;
    const o = t.pbrMetallicRoughness;
    if (o) {
      if (Array.isArray(o.baseColorFactor)) {
        const t = o.baseColorFactor;
        e.color.fromArray(t), e.opacity = t[3];
      }
      void 0 !== o.baseColorTexture && i.push(s.assignTexture(e, "map", o.baseColorTexture));
    }
    return Promise.all(i);
  }
}
class Ia {
  constructor(e) {
    this.parser = e, this.name = Oa.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return t.extensions && t.extensions[this.name] ? Le : null;
  }
  extendMaterialParams(e, t) {
    const s = this.parser,
      i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name]) return Promise.resolve();
    const o = [],
      a = i.extensions[this.name];
    if (void 0 !== a.clearcoatFactor && (t.clearcoat = a.clearcoatFactor), void 0 !== a.clearcoatTexture && o.push(s.assignTexture(t, "clearcoatMap", a.clearcoatTexture)), void 0 !== a.clearcoatRoughnessFactor && (t.clearcoatRoughness = a.clearcoatRoughnessFactor), void 0 !== a.clearcoatRoughnessTexture && o.push(s.assignTexture(t, "clearcoatRoughnessMap", a.clearcoatRoughnessTexture)), void 0 !== a.clearcoatNormalTexture && (o.push(s.assignTexture(t, "clearcoatNormalMap", a.clearcoatNormalTexture)), void 0 !== a.clearcoatNormalTexture.scale)) {
      const e = a.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new r(e, e);
    }
    return Promise.all(o);
  }
}
class Ca {
  constructor(e) {
    this.parser = e, this.name = Oa.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return t.extensions && t.extensions[this.name] ? Le : null;
  }
  extendMaterialParams(e, t) {
    const s = this.parser,
      i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name]) return Promise.resolve();
    const o = [];
    t.sheenColor = new V(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const a = i.extensions[this.name];
    return void 0 !== a.sheenColorFactor && t.sheenColor.fromArray(a.sheenColorFactor), void 0 !== a.sheenRoughnessFactor && (t.sheenRoughness = a.sheenRoughnessFactor), void 0 !== a.sheenColorTexture && o.push(s.assignTexture(t, "sheenColorMap", a.sheenColorTexture)), void 0 !== a.sheenRoughnessTexture && o.push(s.assignTexture(t, "sheenRoughnessMap", a.sheenRoughnessTexture)), Promise.all(o);
  }
}
class Ra {
  constructor(e) {
    this.parser = e, this.name = Oa.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return t.extensions && t.extensions[this.name] ? Le : null;
  }
  extendMaterialParams(e, t) {
    const s = this.parser,
      i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name]) return Promise.resolve();
    const o = [],
      a = i.extensions[this.name];
    return void 0 !== a.transmissionFactor && (t.transmission = a.transmissionFactor), void 0 !== a.transmissionTexture && o.push(s.assignTexture(t, "transmissionMap", a.transmissionTexture)), Promise.all(o);
  }
}
class ka {
  constructor(e) {
    this.parser = e, this.name = Oa.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return t.extensions && t.extensions[this.name] ? Le : null;
  }
  extendMaterialParams(e, t) {
    const s = this.parser,
      i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name]) return Promise.resolve();
    const o = [],
      a = i.extensions[this.name];
    t.thickness = void 0 !== a.thicknessFactor ? a.thicknessFactor : 0, void 0 !== a.thicknessTexture && o.push(s.assignTexture(t, "thicknessMap", a.thicknessTexture)), t.attenuationDistance = a.attenuationDistance || 0;
    const n = a.attenuationColor || [1, 1, 1];
    return t.attenuationColor = new V(n[0], n[1], n[2]), Promise.all(o);
  }
}
class Da {
  constructor(e) {
    this.parser = e, this.name = Oa.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return t.extensions && t.extensions[this.name] ? Le : null;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
    const i = s.extensions[this.name];
    return t.ior = void 0 !== i.ior ? i.ior : 1.5, Promise.resolve();
  }
}
class La {
  constructor(e) {
    this.parser = e, this.name = Oa.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const t = this.parser.json.materials[e];
    return t.extensions && t.extensions[this.name] ? Le : null;
  }
  extendMaterialParams(e, t) {
    const s = this.parser,
      i = s.json.materials[e];
    if (!i.extensions || !i.extensions[this.name]) return Promise.resolve();
    const o = [],
      a = i.extensions[this.name];
    t.specularIntensity = void 0 !== a.specularFactor ? a.specularFactor : 1, void 0 !== a.specularTexture && o.push(s.assignTexture(t, "specularIntensityMap", a.specularTexture));
    const n = a.specularColorFactor || [1, 1, 1];
    return t.specularColor = new V(n[0], n[1], n[2]), void 0 !== a.specularColorTexture && o.push(s.assignTexture(t, "specularColorMap", a.specularColorTexture).then(function (e) {
      e.encoding = Ee;
    })), Promise.all(o);
  }
}
class Ea {
  constructor(e) {
    this.parser = e, this.name = Oa.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser,
      s = t.json,
      i = s.textures[e];
    if (!i.extensions || !i.extensions[this.name]) return null;
    const o = i.extensions[this.name],
      a = t.options.ktx2Loader;
    if (!a) {
      if (s.extensionsRequired && s.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, o.source, a);
  }
}
class Fa {
  constructor(e) {
    this.parser = e, this.name = Oa.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name,
      s = this.parser,
      i = s.json,
      o = i.textures[e];
    if (!o.extensions || !o.extensions[t]) return null;
    const a = o.extensions[t],
      n = i.images[a.source];
    let r = s.textureLoader;
    if (n.uri) {
      const e = s.options.manager.getHandler(n.uri);
      null !== e && (r = e);
    }
    return this.detectSupport().then(function (o) {
      if (o) return s.loadTextureImage(e, n, r);
      if (i.extensionsRequired && i.extensionsRequired.indexOf(t) >= 0) throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return s.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function (e) {
      const t = new Image();
      t.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", t.onload = t.onerror = function () {
        e(1 === t.height);
      };
    })), this.isSupported;
  }
}
class Ua {
  constructor(e) {
    this.name = Oa.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const t = this.parser.json,
      s = t.bufferViews[e];
    if (s.extensions && s.extensions[this.name]) {
      const e = s.extensions[this.name],
        i = this.parser.getDependency("buffer", e.buffer),
        o = this.parser.options.meshoptDecoder;
      if (!o || !o.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return Promise.all([i, o.ready]).then(function (t) {
        const s = e.byteOffset || 0,
          i = e.byteLength || 0,
          a = e.count,
          n = e.byteStride,
          r = new ArrayBuffer(a * n),
          l = new Uint8Array(t[0], s, i);
        return o.decodeGltfBuffer(new Uint8Array(r), a, n, l, e.mode, e.filter), r;
      });
    }
    return null;
  }
}
const za = "glTF",
  Ba = 1313821514,
  Na = 5130562;
class ja {
  constructor(e) {
    this.name = Oa.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, 12);
    if (this.header = {
      magic: Ie.decodeText(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== za) throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2) throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const s = this.header.length - 12,
      i = new DataView(e, 12);
    let o = 0;
    for (; o < s;) {
      const t = i.getUint32(o, !0);
      o += 4;
      const s = i.getUint32(o, !0);
      if (o += 4, s === Ba) {
        const s = new Uint8Array(e, 12 + o, t);
        this.content = Ie.decodeText(s);
      } else if (s === Na) {
        const s = 12 + o;
        this.body = e.slice(s, s + t);
      }
      o += t;
    }
    if (null === this.content) throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Va {
  constructor(e, t) {
    if (!t) throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = Oa.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const s = this.json,
      i = this.dracoLoader,
      o = e.extensions[this.name].bufferView,
      a = e.extensions[this.name].attributes,
      n = {},
      r = {},
      l = {};
    for (const c in a) {
      const e = ln[c] || c.toLowerCase();
      n[e] = a[c];
    }
    for (const c in e.attributes) {
      const t = ln[c] || c.toLowerCase();
      if (void 0 !== a[c]) {
        const i = s.accessors[e.attributes[c]],
          o = on[i.componentType];
        l[t] = o, r[t] = !0 === i.normalized;
      }
    }
    return t.getDependency("bufferView", o).then(function (e) {
      return new Promise(function (t) {
        i.decodeDracoFile(e, function (e) {
          for (const t in e.attributes) {
            const s = e.attributes[t],
              i = r[t];
            void 0 !== i && (s.normalized = i);
          }
          t(e);
        }, n, l);
      });
    });
  }
}
class Ha {
  constructor() {
    this.name = Oa.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return t.texCoord, void 0 === t.offset && void 0 === t.rotation && void 0 === t.scale || (e = e.clone(), void 0 !== t.offset && e.offset.fromArray(t.offset), void 0 !== t.rotation && (e.rotation = t.rotation), void 0 !== t.scale && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}
class Wa extends We {
  constructor(e) {
    super(), this.isGLTFSpecularGlossinessMaterial = !0;
    const t = ["#ifdef USE_SPECULARMAP", "\tuniform sampler2D specularMap;", "#endif"].join("\n"),
      s = ["#ifdef USE_GLOSSINESSMAP", "\tuniform sampler2D glossinessMap;", "#endif"].join("\n"),
      i = ["vec3 specularFactor = specular;", "#ifdef USE_SPECULARMAP", "\tvec4 texelSpecular = texture2D( specularMap, vUv );", "\t// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture", "\tspecularFactor *= texelSpecular.rgb;", "#endif"].join("\n"),
      o = ["float glossinessFactor = glossiness;", "#ifdef USE_GLOSSINESSMAP", "\tvec4 texelGlossiness = texture2D( glossinessMap, vUv );", "\t// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture", "\tglossinessFactor *= texelGlossiness.a;", "#endif"].join("\n"),
      a = ["PhysicalMaterial material;", "material.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );", "vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );", "float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );", "material.roughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.", "material.roughness += geometryRoughness;", "material.roughness = min( material.roughness, 1.0 );", "material.specularColor = specularFactor;"].join("\n"),
      n = {
        specular: {
          value: new V().setHex(16777215)
        },
        glossiness: {
          value: 1
        },
        specularMap: {
          value: null
        },
        glossinessMap: {
          value: null
        }
      };
    this._extraUniforms = n, this.onBeforeCompile = function (e) {
      for (const t in n) e.uniforms[t] = n[t];
      e.fragmentShader = e.fragmentShader.replace("uniform float roughness;", "uniform vec3 specular;").replace("uniform float metalness;", "uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>", t).replace("#include <metalnessmap_pars_fragment>", s).replace("#include <roughnessmap_fragment>", i).replace("#include <metalnessmap_fragment>", o).replace("#include <lights_physical_fragment>", a);
    }, Object.defineProperties(this, {
      specular: {
        get: function () {
          return n.specular.value;
        },
        set: function (e) {
          n.specular.value = e;
        }
      },
      specularMap: {
        get: function () {
          return n.specularMap.value;
        },
        set: function (e) {
          n.specularMap.value = e, e ? this.defines.USE_SPECULARMAP = "" : delete this.defines.USE_SPECULARMAP;
        }
      },
      glossiness: {
        get: function () {
          return n.glossiness.value;
        },
        set: function (e) {
          n.glossiness.value = e;
        }
      },
      glossinessMap: {
        get: function () {
          return n.glossinessMap.value;
        },
        set: function (e) {
          n.glossinessMap.value = e, e ? (this.defines.USE_GLOSSINESSMAP = "", this.defines.USE_UV = "") : (delete this.defines.USE_GLOSSINESSMAP, delete this.defines.USE_UV);
        }
      }
    }), delete this.metalness, delete this.roughness, delete this.metalnessMap, delete this.roughnessMap, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.specularMap = e.specularMap, this.specular.copy(e.specular), this.glossinessMap = e.glossinessMap, this.glossiness = e.glossiness, delete this.metalness, delete this.roughness, delete this.metalnessMap, delete this.roughnessMap, this;
  }
}
class Ga {
  constructor() {
    this.name = Oa.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS, this.specularGlossinessParams = ["color", "map", "lightMap", "lightMapIntensity", "aoMap", "aoMapIntensity", "emissive", "emissiveIntensity", "emissiveMap", "bumpMap", "bumpScale", "normalMap", "normalMapType", "displacementMap", "displacementScale", "displacementBias", "specularMap", "specular", "glossinessMap", "glossiness", "alphaMap", "envMap", "envMapIntensity", "refractionRatio"];
  }
  getMaterialType() {
    return Wa;
  }
  extendParams(e, t, s) {
    const i = t.extensions[this.name];
    e.color = new V(1, 1, 1), e.opacity = 1;
    const o = [];
    if (Array.isArray(i.diffuseFactor)) {
      const t = i.diffuseFactor;
      e.color.fromArray(t), e.opacity = t[3];
    }
    if (void 0 !== i.diffuseTexture && o.push(s.assignTexture(e, "map", i.diffuseTexture)), e.emissive = new V(0, 0, 0), e.glossiness = void 0 !== i.glossinessFactor ? i.glossinessFactor : 1, e.specular = new V(1, 1, 1), Array.isArray(i.specularFactor) && e.specular.fromArray(i.specularFactor), void 0 !== i.specularGlossinessTexture) {
      const t = i.specularGlossinessTexture;
      o.push(s.assignTexture(e, "glossinessMap", t)), o.push(s.assignTexture(e, "specularMap", t));
    }
    return Promise.all(o);
  }
  createMaterial(e) {
    const t = new Wa(e);
    return t.fog = !0, t.color = e.color, t.map = void 0 === e.map ? null : e.map, t.lightMap = null, t.lightMapIntensity = 1, t.aoMap = void 0 === e.aoMap ? null : e.aoMap, t.aoMapIntensity = 1, t.emissive = e.emissive, t.emissiveIntensity = 1, t.emissiveMap = void 0 === e.emissiveMap ? null : e.emissiveMap, t.bumpMap = void 0 === e.bumpMap ? null : e.bumpMap, t.bumpScale = 1, t.normalMap = void 0 === e.normalMap ? null : e.normalMap, t.normalMapType = Fe, e.normalScale && (t.normalScale = e.normalScale), t.displacementMap = null, t.displacementScale = 1, t.displacementBias = 0, t.specularMap = void 0 === e.specularMap ? null : e.specularMap, t.specular = e.specular, t.glossinessMap = void 0 === e.glossinessMap ? null : e.glossinessMap, t.glossiness = e.glossiness, t.alphaMap = null, t.envMap = void 0 === e.envMap ? null : e.envMap, t.envMapIntensity = 1, t.refractionRatio = .98, t;
  }
}
class qa {
  constructor() {
    this.name = Oa.KHR_MESH_QUANTIZATION;
  }
}
class Ya extends bt {
  constructor(e, t, s, i) {
    super(e, t, s, i);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer,
      s = this.sampleValues,
      i = this.valueSize,
      o = e * i * 3 + i;
    for (let a = 0; a !== i; a++) t[a] = s[o + a];
    return t;
  }
}
Ya.prototype.beforeStart_ = Ya.prototype.copySampleValue_, Ya.prototype.afterEnd_ = Ya.prototype.copySampleValue_, Ya.prototype.interpolate_ = function (e, t, s, i) {
  const o = this.resultBuffer,
    a = this.sampleValues,
    n = this.valueSize,
    r = 2 * n,
    l = 3 * n,
    c = i - t,
    h = (s - t) / c,
    u = h * h,
    d = u * h,
    p = e * l,
    f = p - l,
    m = -2 * d + 3 * u,
    g = d - u,
    y = 1 - m,
    b = g - u + h;
  for (let v = 0; v !== n; v++) {
    const e = a[f + v + n],
      t = a[f + v + r] * c,
      s = a[p + v + n],
      i = a[p + v] * c;
    o[v] = y * e + b * t + m * s + g * i;
  }
  return o;
};
const Ka = new H();
class Xa extends Ya {
  interpolate_(e, t, s, i) {
    const o = super.interpolate_(e, t, s, i);
    return Ka.fromArray(o).normalize().toArray(o), o;
  }
}
const $a = 0,
  Za = 1,
  Ja = 2,
  Qa = 3,
  en = 4,
  tn = 5,
  sn = 6,
  on = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array
  },
  an = {
    9728: at,
    9729: xe,
    9984: nt,
    9985: rt,
    9986: lt,
    9987: Be
  },
  nn = {
    33071: ct,
    33648: ht,
    10497: Ne
  },
  rn = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16
  },
  ln = {
    POSITION: "position",
    NORMAL: "normal",
    TANGENT: "tangent",
    TEXCOORD_0: "uv",
    TEXCOORD_1: "uv2",
    COLOR_0: "color",
    WEIGHTS_0: "skinWeight",
    JOINTS_0: "skinIndex"
  },
  cn = {
    scale: "scale",
    translation: "position",
    rotation: "quaternion",
    weights: "morphTargetInfluences"
  },
  hn = {
    CUBICSPLINE: void 0,
    LINEAR: tt,
    STEP: ut
  },
  un = "OPAQUE",
  dn = "MASK",
  pn = "BLEND";
function fn(e, t, s) {
  for (const i in s.extensions) void 0 === e[i] && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[i] = s.extensions[i]);
}
function mn(e, t) {
  void 0 !== t.extras && "object" == typeof t.extras && Object.assign(e.userData, t.extras);
}
function gn(e, t) {
  if (e.updateMorphTargets(), void 0 !== t.weights) for (let s = 0, i = t.weights.length; s < i; s++) e.morphTargetInfluences[s] = t.weights[s];
  if (t.extras && Array.isArray(t.extras.targetNames)) {
    const s = t.extras.targetNames;
    if (e.morphTargetInfluences.length === s.length) {
      e.morphTargetDictionary = {};
      for (let t = 0, i = s.length; t < i; t++) e.morphTargetDictionary[s[t]] = t;
    }
  }
}
function yn(e) {
  const t = e.extensions && e.extensions[Oa.KHR_DRACO_MESH_COMPRESSION];
  let s;
  return s = t ? "draco:" + t.bufferView + ":" + t.indices + ":" + bn(t.attributes) : e.indices + ":" + bn(e.attributes) + ":" + e.mode, s;
}
function bn(e) {
  let t = "";
  const s = Object.keys(e).sort();
  for (let i = 0, o = s.length; i < o; i++) t += s[i] + ":" + e[s[i]] + ";";
  return t;
}
function vn(e) {
  switch (e) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
class wn {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new Ta(), this.associations = new Map(), this.primitiveCache = {}, this.meshCache = {
      refs: {},
      uses: {}
    }, this.cameraCache = {
      refs: {},
      uses: {}
    }, this.lightCache = {
      refs: {},
      uses: {}
    }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {}, "undefined" != typeof createImageBitmap && !1 === /Firefox|^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? this.textureLoader = new Ue(this.options.manager) : this.textureLoader = new ze(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new Ce(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), "use-credentials" === this.options.crossOrigin && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    const s = this,
      i = this.json,
      o = this.extensions;
    this.cache.removeAll(), this._invokeAll(function (e) {
      return e._markDefs && e._markDefs();
    }), Promise.all(this._invokeAll(function (e) {
      return e.beforeRoot && e.beforeRoot();
    })).then(function () {
      return Promise.all([s.getDependencies("scene"), s.getDependencies("animation"), s.getDependencies("camera")]);
    }).then(function (t) {
      const a = {
        scene: t[0][i.scene || 0],
        scenes: t[0],
        animations: t[1],
        cameras: t[2],
        asset: i.asset,
        parser: s,
        userData: {}
      };
      fn(o, a, i), mn(a, i), Promise.all(s._invokeAll(function (e) {
        return e.afterRoot && e.afterRoot(a);
      })).then(function () {
        e(a);
      });
    }).catch(t);
  }
  _markDefs() {
    const e = this.json.nodes || [],
      t = this.json.skins || [],
      s = this.json.meshes || [];
    for (let i = 0, o = t.length; i < o; i++) {
      const s = t[i].joints;
      for (let t = 0, i = s.length; t < i; t++) e[s[t]].isBone = !0;
    }
    for (let i = 0, o = e.length; i < o; i++) {
      const t = e[i];
      void 0 !== t.mesh && (this._addNodeRef(this.meshCache, t.mesh), void 0 !== t.skin && (s[t.mesh].isSkinnedMesh = !0)), void 0 !== t.camera && this._addNodeRef(this.cameraCache, t.camera);
    }
  }
  _addNodeRef(e, t) {
    void 0 !== t && (void 0 === e.refs[t] && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
  }
  _getNodeRef(e, t, s) {
    if (e.refs[t] <= 1) return s;
    const i = s.clone(),
      o = (e, t) => {
        const s = this.associations.get(e);
        null != s && this.associations.set(t, s);
        for (const [i, a] of e.children.entries()) o(a, t.children[i]);
      };
    return o(s, i), i.name += "_instance_" + e.uses[t]++, i;
  }
  _invokeOne(e) {
    const t = Object.values(this.plugins);
    t.push(this);
    for (let s = 0; s < t.length; s++) {
      const i = e(t[s]);
      if (i) return i;
    }
    return null;
  }
  _invokeAll(e) {
    const t = Object.values(this.plugins);
    t.unshift(this);
    const s = [];
    for (let i = 0; i < t.length; i++) {
      const o = e(t[i]);
      o && s.push(o);
    }
    return s;
  }
  getDependency(e, t) {
    const s = e + ":" + t;
    let i = this.cache.get(s);
    if (!i) {
      switch (e) {
        case "scene":
          i = this.loadScene(t);
          break;
        case "node":
          i = this.loadNode(t);
          break;
        case "mesh":
          i = this._invokeOne(function (e) {
            return e.loadMesh && e.loadMesh(t);
          });
          break;
        case "accessor":
          i = this.loadAccessor(t);
          break;
        case "bufferView":
          i = this._invokeOne(function (e) {
            return e.loadBufferView && e.loadBufferView(t);
          });
          break;
        case "buffer":
          i = this.loadBuffer(t);
          break;
        case "material":
          i = this._invokeOne(function (e) {
            return e.loadMaterial && e.loadMaterial(t);
          });
          break;
        case "texture":
          i = this._invokeOne(function (e) {
            return e.loadTexture && e.loadTexture(t);
          });
          break;
        case "skin":
          i = this.loadSkin(t);
          break;
        case "animation":
          i = this.loadAnimation(t);
          break;
        case "camera":
          i = this.loadCamera(t);
          break;
        default:
          throw new Error("Unknown type: " + e);
      }
      this.cache.add(s, i);
    }
    return i;
  }
  getDependencies(e) {
    let t = this.cache.get(e);
    if (!t) {
      const s = this,
        i = this.json[e + ("mesh" === e ? "es" : "s")] || [];
      t = Promise.all(i.map(function (t, i) {
        return s.getDependency(e, i);
      })), this.cache.add(e, t);
    }
    return t;
  }
  loadBuffer(e) {
    const t = this.json.buffers[e],
      s = this.fileLoader;
    if (t.type && "arraybuffer" !== t.type) throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
    if (void 0 === t.uri && 0 === e) return Promise.resolve(this.extensions[Oa.KHR_BINARY_GLTF].body);
    const i = this.options;
    return new Promise(function (e, o) {
      s.load(Ie.resolveURL(t.uri, i.path), e, void 0, function () {
        o(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
      });
    });
  }
  loadBufferView(e) {
    const t = this.json.bufferViews[e];
    return this.getDependency("buffer", t.buffer).then(function (e) {
      const s = t.byteLength || 0,
        i = t.byteOffset || 0;
      return e.slice(i, i + s);
    });
  }
  loadAccessor(e) {
    const t = this,
      s = this.json,
      i = this.json.accessors[e];
    if (void 0 === i.bufferView && void 0 === i.sparse) return Promise.resolve(null);
    const o = [];
    return void 0 !== i.bufferView ? o.push(this.getDependency("bufferView", i.bufferView)) : o.push(null), void 0 !== i.sparse && (o.push(this.getDependency("bufferView", i.sparse.indices.bufferView)), o.push(this.getDependency("bufferView", i.sparse.values.bufferView))), Promise.all(o).then(function (e) {
      const o = e[0],
        a = rn[i.type],
        n = on[i.componentType],
        r = n.BYTES_PER_ELEMENT,
        l = r * a,
        c = i.byteOffset || 0,
        h = void 0 !== i.bufferView ? s.bufferViews[i.bufferView].byteStride : void 0,
        u = !0 === i.normalized;
      let d, p;
      if (h && h !== l) {
        const e = Math.floor(c / h),
          s = "InterleavedBuffer:" + i.bufferView + ":" + i.componentType + ":" + e + ":" + i.count;
        let l = t.cache.get(s);
        l || (d = new n(o, e * h, i.count * h / r), l = new A(d, h / r), t.cache.add(s, l)), p = new I(l, a, c % h / r, u);
      } else d = null === o ? new n(i.count * a) : new n(o, c, i.count * a), p = new O(d, a, u);
      if (void 0 !== i.sparse) {
        const t = rn.SCALAR,
          s = on[i.sparse.indices.componentType],
          r = i.sparse.indices.byteOffset || 0,
          l = i.sparse.values.byteOffset || 0,
          c = new s(e[1], r, i.sparse.count * t),
          h = new n(e[2], l, i.sparse.count * a);
        null !== o && (p = new O(p.array.slice(), p.itemSize, p.normalized));
        for (let e = 0, i = c.length; e < i; e++) {
          const t = c[e];
          if (p.setX(t, h[e * a]), a >= 2 && p.setY(t, h[e * a + 1]), a >= 3 && p.setZ(t, h[e * a + 2]), a >= 4 && p.setW(t, h[e * a + 3]), a >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
      }
      return p;
    });
  }
  loadTexture(e) {
    const t = this.json,
      s = this.options,
      i = t.textures[e].source,
      o = t.images[i];
    let a = this.textureLoader;
    if (o.uri) {
      const e = s.manager.getHandler(o.uri);
      null !== e && (a = e);
    }
    return this.loadTextureImage(e, i, a);
  }
  loadTextureImage(e, t, s) {
    const i = this,
      o = this.json,
      a = o.textures[e],
      n = o.images[t],
      r = (n.uri || n.bufferView) + ":" + a.sampler;
    if (this.textureCache[r]) return this.textureCache[r];
    const l = this.loadImageSource(t, s).then(function (t) {
      t.flipY = !1, a.name && (t.name = a.name);
      const s = (o.samplers || {})[a.sampler] || {};
      return t.magFilter = an[s.magFilter] || xe, t.minFilter = an[s.minFilter] || Be, t.wrapS = nn[s.wrapS] || Ne, t.wrapT = nn[s.wrapT] || Ne, i.associations.set(t, {
        textures: e
      }), t;
    }).catch(function () {
      return null;
    });
    return this.textureCache[r] = l, l;
  }
  loadImageSource(e, t) {
    const s = this,
      i = this.json,
      o = this.options;
    if (void 0 !== this.sourceCache[e]) return this.sourceCache[e].then(function (e) {
      return e.clone();
    }).catch(function (e) {
      throw e;
    });
    const a = i.images[e],
      n = self.URL || self.webkitURL;
    let r = a.uri || "",
      l = !1;
    if (void 0 !== a.bufferView) r = s.getDependency("bufferView", a.bufferView).then(function (e) {
      l = !0;
      const t = new Blob([e], {
        type: a.mimeType
      });
      return r = n.createObjectURL(t), r;
    });else if (void 0 === a.uri) throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const c = Promise.resolve(r).then(function (e) {
      return new Promise(function (s, i) {
        let a = s;
        !0 === t.isImageBitmapLoader && (a = function (e) {
          const t = new pt(e);
          t.needsUpdate = !0, s(t);
        }), t.load(Ie.resolveURL(e, o.path), a, void 0, i);
      });
    }).then(function (e) {
      var t;
      return !0 === l && n.revokeObjectURL(r), e.userData.mimeType = a.mimeType || ((t = a.uri).search(/\.jpe?g($|\?)/i) > 0 || 0 === t.search(/^data\:image\/jpeg/) ? "image/jpeg" : t.search(/\.webp($|\?)/i) > 0 || 0 === t.search(/^data\:image\/webp/) ? "image/webp" : "image/png"), e;
    }).catch(function (e) {
      throw e;
    });
    return this.sourceCache[e] = c, c;
  }
  assignTexture(e, t, s) {
    const i = this;
    return this.getDependency("texture", s.index).then(function (o) {
      if (void 0 !== s.texCoord && 0 != s.texCoord && ("aoMap" !== t || s.texCoord), i.extensions[Oa.KHR_TEXTURE_TRANSFORM]) {
        const e = void 0 !== s.extensions ? s.extensions[Oa.KHR_TEXTURE_TRANSFORM] : void 0;
        if (e) {
          const t = i.associations.get(o);
          o = i.extensions[Oa.KHR_TEXTURE_TRANSFORM].extendTexture(o, e), i.associations.set(o, t);
        }
      }
      return e[t] = o, o;
    });
  }
  assignFinalMaterial(e) {
    const t = e.geometry;
    let s = e.material;
    const i = void 0 === t.attributes.tangent,
      o = void 0 !== t.attributes.color,
      a = void 0 === t.attributes.normal;
    if (e.isPoints) {
      const e = "PointsMaterial:" + s.uuid;
      let t = this.cache.get(e);
      t || (t = new je(), Ve.prototype.copy.call(t, s), t.color.copy(s.color), t.map = s.map, t.sizeAttenuation = !1, this.cache.add(e, t)), s = t;
    } else if (e.isLine) {
      const e = "LineBasicMaterial:" + s.uuid;
      let t = this.cache.get(e);
      t || (t = new He(), Ve.prototype.copy.call(t, s), t.color.copy(s.color), this.cache.add(e, t)), s = t;
    }
    if (i || o || a) {
      let e = "ClonedMaterial:" + s.uuid + ":";
      s.isGLTFSpecularGlossinessMaterial && (e += "specular-glossiness:"), i && (e += "derivative-tangents:"), o && (e += "vertex-colors:"), a && (e += "flat-shading:");
      let t = this.cache.get(e);
      t || (t = s.clone(), o && (t.vertexColors = !0), a && (t.flatShading = !0), i && (t.normalScale && (t.normalScale.y *= -1), t.clearcoatNormalScale && (t.clearcoatNormalScale.y *= -1)), this.cache.add(e, t), this.associations.set(t, this.associations.get(s))), s = t;
    }
    s.aoMap && void 0 === t.attributes.uv2 && void 0 !== t.attributes.uv && t.setAttribute("uv2", t.attributes.uv), e.material = s;
  }
  getMaterialType() {
    return We;
  }
  loadMaterial(e) {
    const t = this,
      s = this.json,
      i = this.extensions,
      o = s.materials[e];
    let a;
    const n = {},
      l = o.extensions || {},
      c = [];
    if (l[Oa.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
      const e = i[Oa.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
      a = e.getMaterialType(), c.push(e.extendParams(n, o, t));
    } else if (l[Oa.KHR_MATERIALS_UNLIT]) {
      const e = i[Oa.KHR_MATERIALS_UNLIT];
      a = e.getMaterialType(), c.push(e.extendParams(n, o, t));
    } else {
      const s = o.pbrMetallicRoughness || {};
      if (n.color = new V(1, 1, 1), n.opacity = 1, Array.isArray(s.baseColorFactor)) {
        const e = s.baseColorFactor;
        n.color.fromArray(e), n.opacity = e[3];
      }
      void 0 !== s.baseColorTexture && c.push(t.assignTexture(n, "map", s.baseColorTexture)), n.metalness = void 0 !== s.metallicFactor ? s.metallicFactor : 1, n.roughness = void 0 !== s.roughnessFactor ? s.roughnessFactor : 1, void 0 !== s.metallicRoughnessTexture && (c.push(t.assignTexture(n, "metalnessMap", s.metallicRoughnessTexture)), c.push(t.assignTexture(n, "roughnessMap", s.metallicRoughnessTexture))), a = this._invokeOne(function (t) {
        return t.getMaterialType && t.getMaterialType(e);
      }), c.push(Promise.all(this._invokeAll(function (t) {
        return t.extendMaterialParams && t.extendMaterialParams(e, n);
      })));
    }
    !0 === o.doubleSided && (n.side = b);
    const h = o.alphaMode || un;
    if (h === pn ? (n.transparent = !0, n.depthWrite = !1) : (n.transparent = !1, h === dn && (n.alphaTest = void 0 !== o.alphaCutoff ? o.alphaCutoff : .5)), void 0 !== o.normalTexture && a !== y && (c.push(t.assignTexture(n, "normalMap", o.normalTexture)), n.normalScale = new r(1, 1), void 0 !== o.normalTexture.scale)) {
      const e = o.normalTexture.scale;
      n.normalScale.set(e, e);
    }
    return void 0 !== o.occlusionTexture && a !== y && (c.push(t.assignTexture(n, "aoMap", o.occlusionTexture)), void 0 !== o.occlusionTexture.strength && (n.aoMapIntensity = o.occlusionTexture.strength)), void 0 !== o.emissiveFactor && a !== y && (n.emissive = new V().fromArray(o.emissiveFactor)), void 0 !== o.emissiveTexture && a !== y && c.push(t.assignTexture(n, "emissiveMap", o.emissiveTexture)), Promise.all(c).then(function () {
      let s;
      return s = a === Wa ? i[Oa.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(n) : new a(n), o.name && (s.name = o.name), s.map && (s.map.encoding = Ee), s.emissiveMap && (s.emissiveMap.encoding = Ee), s.sheenColorMap && (s.sheenColorMap.encoding = Ee), s.specularColorMap && (s.specularColorMap.encoding = Ee), s.specularMap && (s.specularMap.encoding = Ee), mn(s, o), t.associations.set(s, {
        materials: e
      }), o.extensions && fn(i, s, o), s;
    });
  }
  createUniqueName(e) {
    const t = Ge.sanitizeNodeName(e || "");
    let s = t;
    for (let i = 1; this.nodeNamesUsed[s]; ++i) s = t + "_" + i;
    return this.nodeNamesUsed[s] = !0, s;
  }
  loadGeometries(e) {
    const t = this,
      s = this.extensions,
      i = this.primitiveCache;
    function o(e) {
      return s[Oa.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e, t).then(function (s) {
        return xn(s, e, t);
      });
    }
    const a = [];
    for (let n = 0, r = e.length; n < r; n++) {
      const s = e[n],
        r = yn(s),
        l = i[r];
      if (l) a.push(l.promise);else {
        let e;
        e = s.extensions && s.extensions[Oa.KHR_DRACO_MESH_COMPRESSION] ? o(s) : xn(new P(), s, t), i[r] = {
          primitive: s,
          promise: e
        }, a.push(e);
      }
    }
    return Promise.all(a);
  }
  loadMesh(e) {
    const t = this,
      s = this.json,
      i = this.extensions,
      o = s.meshes[e],
      a = o.primitives,
      n = [];
    for (let l = 0, c = a.length; l < c; l++) {
      const e = void 0 === a[l].material ? (void 0 === (r = this.cache).DefaultMaterial && (r.DefaultMaterial = new We({
        color: 16777215,
        emissive: 0,
        metalness: 1,
        roughness: 1,
        transparent: !1,
        depthTest: !0,
        side: dt
      })), r.DefaultMaterial) : this.getDependency("material", a[l].material);
      n.push(e);
    }
    var r;
    return n.push(t.loadGeometries(a)), Promise.all(n).then(function (s) {
      const n = s.slice(0, s.length - 1),
        r = s[s.length - 1],
        l = [];
      for (let h = 0, u = r.length; h < u; h++) {
        const s = r[h],
          c = a[h];
        let u;
        const d = n[h];
        if (c.mode === en || c.mode === tn || c.mode === sn || void 0 === c.mode) u = !0 === o.isSkinnedMesh ? new qe(s, d) : new T(s, d), !0 !== u.isSkinnedMesh || u.geometry.attributes.skinWeight.normalized || u.normalizeSkinWeights(), c.mode === tn ? u.geometry = Sn(u.geometry, k) : c.mode === sn && (u.geometry = Sn(u.geometry, R));else if (c.mode === Za) u = new Ye(s, d);else if (c.mode === Qa) u = new Ke(s, d);else if (c.mode === Ja) u = new Xe(s, d);else {
          if (c.mode !== $a) throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + c.mode);
          u = new $e(s, d);
        }
        Object.keys(u.geometry.morphAttributes).length > 0 && gn(u, o), u.name = t.createUniqueName(o.name || "mesh_" + e), mn(u, o), c.extensions && fn(i, u, c), t.assignFinalMaterial(u), l.push(u);
      }
      for (let i = 0, o = l.length; i < o; i++) t.associations.set(l[i], {
        meshes: e,
        primitives: i
      });
      if (1 === l.length) return l[0];
      const c = new Ze();
      t.associations.set(c, {
        meshes: e
      });
      for (let e = 0, t = l.length; e < t; e++) c.add(l[e]);
      return c;
    });
  }
  loadCamera(e) {
    let t;
    const s = this.json.cameras[e],
      i = s[s.type];
    if (i) return "perspective" === s.type ? t = new Je(Qe.radToDeg(i.yfov), i.aspectRatio || 1, i.znear || 1, i.zfar || 2e6) : "orthographic" === s.type && (t = new et(-i.xmag, i.xmag, i.ymag, -i.ymag, i.znear, i.zfar)), s.name && (t.name = this.createUniqueName(s.name)), mn(t, s), Promise.resolve(t);
  }
  loadSkin(e) {
    const t = this.json.skins[e],
      s = {
        joints: t.joints
      };
    return void 0 === t.inverseBindMatrices ? Promise.resolve(s) : this.getDependency("accessor", t.inverseBindMatrices).then(function (e) {
      return s.inverseBindMatrices = e, s;
    });
  }
  loadAnimation(e) {
    const t = this.json.animations[e],
      s = [],
      i = [],
      o = [],
      a = [],
      n = [];
    for (let r = 0, l = t.channels.length; r < l; r++) {
      const e = t.channels[r],
        l = t.samplers[e.sampler],
        c = e.target,
        h = void 0 !== c.node ? c.node : c.id,
        u = void 0 !== t.parameters ? t.parameters[l.input] : l.input,
        d = void 0 !== t.parameters ? t.parameters[l.output] : l.output;
      s.push(this.getDependency("node", h)), i.push(this.getDependency("accessor", u)), o.push(this.getDependency("accessor", d)), a.push(l), n.push(c);
    }
    return Promise.all([Promise.all(s), Promise.all(i), Promise.all(o), Promise.all(a), Promise.all(n)]).then(function (s) {
      const i = s[0],
        o = s[1],
        a = s[2],
        n = s[3],
        r = s[4],
        l = [];
      for (let e = 0, t = i.length; e < t; e++) {
        const t = i[e],
          s = o[e],
          c = a[e],
          h = n[e],
          u = r[e];
        if (void 0 === t) continue;
        let d;
        switch (t.updateMatrix(), t.matrixAutoUpdate = !0, cn[u.path]) {
          case cn.weights:
            d = gt;
            break;
          case cn.rotation:
            d = mt;
            break;
          default:
            d = ft;
        }
        const p = t.name ? t.name : t.uuid,
          f = void 0 !== h.interpolation ? hn[h.interpolation] : tt,
          m = [];
        cn[u.path] === cn.weights ? t.traverse(function (e) {
          e.morphTargetInfluences && m.push(e.name ? e.name : e.uuid);
        }) : m.push(p);
        let g = c.array;
        if (c.normalized) {
          const e = vn(g.constructor),
            t = new Float32Array(g.length);
          for (let s = 0, i = g.length; s < i; s++) t[s] = g[s] * e;
          g = t;
        }
        for (let e = 0, i = m.length; e < i; e++) {
          const t = new d(m[e] + "." + cn[u.path], s.array, g, f);
          "CUBICSPLINE" === h.interpolation && (t.createInterpolant = function (e) {
            return new (this instanceof mt ? Xa : Ya)(this.times, this.values, this.getValueSize() / 3, e);
          }, t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0), l.push(t);
        }
      }
      const c = t.name ? t.name : "animation_" + e;
      return new st(c, void 0, l);
    });
  }
  createNodeMesh(e) {
    const t = this.json,
      s = this,
      i = t.nodes[e];
    return void 0 === i.mesh ? null : s.getDependency("mesh", i.mesh).then(function (e) {
      const t = s._getNodeRef(s.meshCache, i.mesh, e);
      return void 0 !== i.weights && t.traverse(function (e) {
        if (e.isMesh) for (let t = 0, s = i.weights.length; t < s; t++) e.morphTargetInfluences[t] = i.weights[t];
      }), t;
    });
  }
  loadNode(e) {
    const t = this.json,
      s = this.extensions,
      i = this,
      o = t.nodes[e],
      a = o.name ? i.createUniqueName(o.name) : "";
    return function () {
      const t = [],
        s = i._invokeOne(function (t) {
          return t.createNodeMesh && t.createNodeMesh(e);
        });
      return s && t.push(s), void 0 !== o.camera && t.push(i.getDependency("camera", o.camera).then(function (e) {
        return i._getNodeRef(i.cameraCache, o.camera, e);
      })), i._invokeAll(function (t) {
        return t.createNodeAttachment && t.createNodeAttachment(e);
      }).forEach(function (e) {
        t.push(e);
      }), Promise.all(t);
    }().then(function (t) {
      let n;
      if (n = !0 === o.isBone ? new it() : t.length > 1 ? new Ze() : 1 === t.length ? t[0] : new L(), n !== t[0]) for (let e = 0, s = t.length; e < s; e++) n.add(t[e]);
      if (o.name && (n.userData.name = o.name, n.name = a), mn(n, o), o.extensions && fn(s, n, o), void 0 !== o.matrix) {
        const e = new l();
        e.fromArray(o.matrix), n.applyMatrix4(e);
      } else void 0 !== o.translation && n.position.fromArray(o.translation), void 0 !== o.rotation && n.quaternion.fromArray(o.rotation), void 0 !== o.scale && n.scale.fromArray(o.scale);
      return i.associations.has(n) || i.associations.set(n, {}), i.associations.get(n).nodes = e, n;
    });
  }
  loadScene(e) {
    const t = this.json,
      s = this.extensions,
      i = this.json.scenes[e],
      o = this,
      a = new Ze();
    i.name && (a.name = o.createUniqueName(i.name)), mn(a, i), i.extensions && fn(s, a, i);
    const n = i.nodes || [],
      r = [];
    for (let l = 0, c = n.length; l < c; l++) r.push(_n(n[l], a, t, o));
    return Promise.all(r).then(function () {
      return o.associations = (e => {
        const t = new Map();
        for (const [s, i] of o.associations) (s instanceof Ve || s instanceof pt) && t.set(s, i);
        return e.traverse(e => {
          const s = o.associations.get(e);
          null != s && t.set(e, s);
        }), t;
      })(a), a;
    });
  }
}
function _n(e, t, s, i) {
  const o = s.nodes[e];
  return i.getDependency("node", e).then(function (e) {
    if (void 0 === o.skin) return e;
    let t;
    return i.getDependency("skin", o.skin).then(function (e) {
      t = e;
      const s = [];
      for (let o = 0, a = t.joints.length; o < a; o++) s.push(i.getDependency("node", t.joints[o]));
      return Promise.all(s);
    }).then(function (s) {
      return e.traverse(function (e) {
        if (!e.isMesh) return;
        const i = [],
          o = [];
        for (let a = 0, n = s.length; a < n; a++) {
          const e = s[a];
          if (e) {
            i.push(e);
            const s = new l();
            void 0 !== t.inverseBindMatrices && s.fromArray(t.inverseBindMatrices.array, 16 * a), o.push(s);
          }
        }
        e.bind(new ot(i, o), e.matrixWorld);
      }), e;
    });
  }).then(function (e) {
    t.add(e);
    const a = [];
    if (o.children) {
      const t = o.children;
      for (let o = 0, n = t.length; o < n; o++) {
        const n = t[o];
        a.push(_n(n, e, s, i));
      }
    }
    return Promise.all(a);
  });
}
function xn(e, t, s) {
  const i = t.attributes,
    o = [];
  function a(t, i) {
    return s.getDependency("accessor", t).then(function (t) {
      e.setAttribute(i, t);
    });
  }
  for (const n in i) {
    const t = ln[n] || n.toLowerCase();
    t in e.attributes || o.push(a(i[n], t));
  }
  if (void 0 !== t.indices && !e.index) {
    const i = s.getDependency("accessor", t.indices).then(function (t) {
      e.setIndex(t);
    });
    o.push(i);
  }
  return mn(e, t), function (e, t, s) {
    const i = t.attributes,
      o = new yt();
    if (void 0 === i.POSITION) return;
    {
      const e = s.json.accessors[i.POSITION],
        t = e.min,
        a = e.max;
      if (void 0 === t || void 0 === a) return;
      if (o.set(new n(t[0], t[1], t[2]), new n(a[0], a[1], a[2])), e.normalized) {
        const t = vn(on[e.componentType]);
        o.min.multiplyScalar(t), o.max.multiplyScalar(t);
      }
    }
    const a = t.targets;
    if (void 0 !== a) {
      const e = new n(),
        t = new n();
      for (let i = 0, o = a.length; i < o; i++) {
        const o = a[i];
        if (void 0 !== o.POSITION) {
          const i = s.json.accessors[o.POSITION],
            a = i.min,
            n = i.max;
          if (void 0 !== a && void 0 !== n) {
            if (t.setX(Math.max(Math.abs(a[0]), Math.abs(n[0]))), t.setY(Math.max(Math.abs(a[1]), Math.abs(n[1]))), t.setZ(Math.max(Math.abs(a[2]), Math.abs(n[2]))), i.normalized) {
              const e = vn(on[i.componentType]);
              t.multiplyScalar(e);
            }
            e.max(t);
          }
        }
      }
      o.expandByVector(e);
    }
    e.boundingBox = o;
    const r = new h();
    o.getCenter(r.center), r.radius = o.min.distanceTo(o.max) / 2, e.boundingSphere = r;
  }(e, t, s), Promise.all(o).then(function () {
    return void 0 !== t.targets ? function (e, t, s) {
      let i = !1,
        o = !1,
        a = !1;
      for (let c = 0, h = t.length; c < h; c++) {
        const e = t[c];
        if (void 0 !== e.POSITION && (i = !0), void 0 !== e.NORMAL && (o = !0), void 0 !== e.COLOR_0 && (a = !0), i && o && a) break;
      }
      if (!i && !o && !a) return Promise.resolve(e);
      const n = [],
        r = [],
        l = [];
      for (let c = 0, h = t.length; c < h; c++) {
        const h = t[c];
        if (i) {
          const t = void 0 !== h.POSITION ? s.getDependency("accessor", h.POSITION) : e.attributes.position;
          n.push(t);
        }
        if (o) {
          const t = void 0 !== h.NORMAL ? s.getDependency("accessor", h.NORMAL) : e.attributes.normal;
          r.push(t);
        }
        if (a) {
          const t = void 0 !== h.COLOR_0 ? s.getDependency("accessor", h.COLOR_0) : e.attributes.color;
          l.push(t);
        }
      }
      return Promise.all([Promise.all(n), Promise.all(r), Promise.all(l)]).then(function (t) {
        const s = t[0],
          n = t[1],
          r = t[2];
        return i && (e.morphAttributes.position = s), o && (e.morphAttributes.normal = n), a && (e.morphAttributes.color = r), e.morphTargetsRelative = !0, e;
      });
    }(e, t.targets, s) : e;
  });
}
function Sn(e, t) {
  let s = e.getIndex();
  if (null === s) {
    const t = [],
      i = e.getAttribute("position");
    if (void 0 === i) return e;
    for (let e = 0; e < i.count; e++) t.push(e);
    e.setIndex(t), s = e.getIndex();
  }
  const i = s.count - 2,
    o = [];
  if (t === R) for (let n = 1; n <= i; n++) o.push(s.getX(0)), o.push(s.getX(n)), o.push(s.getX(n + 1));else for (let n = 0; n < i; n++) n % 2 == 0 ? (o.push(s.getX(n)), o.push(s.getX(n + 1)), o.push(s.getX(n + 2))) : (o.push(s.getX(n + 2)), o.push(s.getX(n + 1)), o.push(s.getX(n)));
  o.length;
  const a = e.clone();
  return a.setIndex(o), a;
}
const Mn = new WeakMap();
function Tn() {
  let e, t;
  function s(e, t, s, i, o, a) {
    const n = a.num_components(),
      r = s.num_points() * n,
      l = r * o.BYTES_PER_ELEMENT,
      c = function (e, t) {
        switch (t) {
          case Float32Array:
            return e.DT_FLOAT32;
          case Int8Array:
            return e.DT_INT8;
          case Int16Array:
            return e.DT_INT16;
          case Int32Array:
            return e.DT_INT32;
          case Uint8Array:
            return e.DT_UINT8;
          case Uint16Array:
            return e.DT_UINT16;
          case Uint32Array:
            return e.DT_UINT32;
        }
      }(e, o),
      h = e._malloc(l);
    t.GetAttributeDataArrayForAllPoints(s, a, c, l, h);
    const u = new o(e.HEAPF32.buffer, h, r).slice();
    return e._free(h), {
      name: i,
      array: u,
      itemSize: n
    };
  }
  onmessage = function (i) {
    const o = i.data;
    switch (o.type) {
      case "init":
        e = o.decoderConfig, t = new Promise(function (t) {
          e.onModuleLoaded = function (e) {
            t({
              draco: e
            });
          }, DracoDecoderModule(e);
        });
        break;
      case "decode":
        const i = o.buffer,
          a = o.taskConfig;
        t.then(e => {
          const t = e.draco,
            n = new t.Decoder(),
            r = new t.DecoderBuffer();
          r.Init(new Int8Array(i), i.byteLength);
          try {
            const e = function (e, t, i, o) {
                const a = o.attributeIDs,
                  n = o.attributeTypes;
                let r, l;
                const c = t.GetEncodedGeometryType(i);
                if (c === e.TRIANGULAR_MESH) r = new e.Mesh(), l = t.DecodeBufferToMesh(i, r);else {
                  if (c !== e.POINT_CLOUD) throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
                  r = new e.PointCloud(), l = t.DecodeBufferToPointCloud(i, r);
                }
                if (!l.ok() || 0 === r.ptr) throw new Error("THREE.DRACOLoader: Decoding failed: " + l.error_msg());
                const h = {
                  index: null,
                  attributes: []
                };
                for (const u in a) {
                  const i = self[n[u]];
                  let l, c;
                  if (o.useUniqueIDs) c = a[u], l = t.GetAttributeByUniqueId(r, c);else {
                    if (c = t.GetAttributeId(r, e[a[u]]), -1 === c) continue;
                    l = t.GetAttribute(r, c);
                  }
                  h.attributes.push(s(e, t, r, u, i, l));
                }
                c === e.TRIANGULAR_MESH && (h.index = function (e, t, s) {
                  const i = s.num_faces(),
                    o = 3 * i,
                    a = 4 * o,
                    n = e._malloc(a);
                  t.GetTrianglesUInt32Array(s, a, n);
                  const r = new Uint32Array(e.HEAPF32.buffer, n, o).slice();
                  return e._free(n), {
                    array: r,
                    itemSize: 1
                  };
                }(e, t, r));
                return e.destroy(r), h;
              }(t, n, r, a),
              i = e.attributes.map(e => e.array.buffer);
            e.index && i.push(e.index.array.buffer), self.postMessage({
              type: "decode",
              id: o.id,
              geometry: e
            }, i);
          } catch (l) {
            self.postMessage({
              type: "error",
              id: o.id,
              error: l.message
            });
          } finally {
            t.destroy(r), t.destroy(n);
          }
        });
    }
  };
}
const On = new vt(),
  Pn = new class extends Ae {
    constructor(e) {
      super(e), this.decoderPath = "", this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = {
        position: "POSITION",
        normal: "NORMAL",
        color: "COLOR",
        uv: "TEX_COORD"
      }, this.defaultAttributeTypes = {
        position: "Float32Array",
        normal: "Float32Array",
        color: "Float32Array",
        uv: "Float32Array"
      };
    }
    setDecoderPath(e) {
      return this.decoderPath = e, this;
    }
    setDecoderConfig(e) {
      return this.decoderConfig = e, this;
    }
    setWorkerLimit(e) {
      return this.workerLimit = e, this;
    }
    load(e, t, s, i) {
      const o = new Ce(this.manager);
      o.setPath(this.path), o.setResponseType("arraybuffer"), o.setRequestHeader(this.requestHeader), o.setWithCredentials(this.withCredentials), o.load(e, e => {
        const s = {
          attributeIDs: this.defaultAttributeIDs,
          attributeTypes: this.defaultAttributeTypes,
          useUniqueIDs: !1
        };
        this.decodeGeometry(e, s).then(t).catch(i);
      }, s, i);
    }
    decodeDracoFile(e, t, s, i) {
      const o = {
        attributeIDs: s || this.defaultAttributeIDs,
        attributeTypes: i || this.defaultAttributeTypes,
        useUniqueIDs: !!s
      };
      this.decodeGeometry(e, o).then(t);
    }
    decodeGeometry(e, t) {
      for (const r in t.attributeTypes) {
        const e = t.attributeTypes[r];
        void 0 !== e.BYTES_PER_ELEMENT && (t.attributeTypes[r] = e.name);
      }
      const s = JSON.stringify(t);
      if (Mn.has(e)) {
        const t = Mn.get(e);
        if (t.key === s) return t.promise;
        if (0 === e.byteLength) throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.");
      }
      let i;
      const o = this.workerNextTaskID++,
        a = e.byteLength,
        n = this._getWorker(o, a).then(s => (i = s, new Promise((s, a) => {
          i._callbacks[o] = {
            resolve: s,
            reject: a
          }, i.postMessage({
            type: "decode",
            id: o,
            taskConfig: t,
            buffer: e
          }, [e]);
        }))).then(e => this._createGeometry(e.geometry));
      return n.catch(() => !0).then(() => {
        i && o && this._releaseTask(i, o);
      }), Mn.set(e, {
        key: s,
        promise: n
      }), n;
    }
    _createGeometry(e) {
      const t = new P();
      e.index && t.setIndex(new O(e.index.array, 1));
      for (let s = 0; s < e.attributes.length; s++) {
        const i = e.attributes[s],
          o = i.name,
          a = i.array,
          n = i.itemSize;
        t.setAttribute(o, new O(a, n));
      }
      return t;
    }
    _loadLibrary(e, t) {
      const s = new Ce(this.manager);
      return s.setPath(this.decoderPath), s.setResponseType(t), s.setWithCredentials(this.withCredentials), new Promise((t, i) => {
        s.load(e, t, void 0, i);
      });
    }
    preload() {
      return this._initDecoder(), this;
    }
    _initDecoder() {
      if (this.decoderPending) return this.decoderPending;
      const e = "object" != typeof WebAssembly || "js" === this.decoderConfig.type,
        t = [];
      return e ? t.push(this._loadLibrary("draco_decoder.js", "text")) : (t.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), t.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(t).then(t => {
        const s = t[0];
        e || (this.decoderConfig.wasmBinary = t[1]);
        const i = Tn.toString(),
          o = ["/* draco decoder */", s, "", "/* worker */", i.substring(i.indexOf("{") + 1, i.lastIndexOf("}"))].join("\n");
        this.workerSourceURL = URL.createObjectURL(new Blob([o]));
      }), this.decoderPending;
    }
    _getWorker(e, t) {
      return this._initDecoder().then(() => {
        if (this.workerPool.length < this.workerLimit) {
          const e = new Worker(this.workerSourceURL);
          e._callbacks = {}, e._taskCosts = {}, e._taskLoad = 0, e.postMessage({
            type: "init",
            decoderConfig: this.decoderConfig
          }), e.onmessage = function (t) {
            const s = t.data;
            switch (s.type) {
              case "decode":
                e._callbacks[s.id].resolve(s);
                break;
              case "error":
                e._callbacks[s.id].reject(s);
            }
          }, this.workerPool.push(e);
        } else this.workerPool.sort(function (e, t) {
          return e._taskLoad > t._taskLoad ? -1 : 1;
        });
        const s = this.workerPool[this.workerPool.length - 1];
        return s._taskCosts[e] = t, s._taskLoad += t, s;
      });
    }
    _releaseTask(e, t) {
      e._taskLoad -= e._taskCosts[t], delete e._callbacks[t], delete e._taskCosts[t];
    }
    debug() {}
    dispose() {
      for (let e = 0; e < this.workerPool.length; ++e) this.workerPool[e].terminate();
      return this.workerPool.length = 0, this;
    }
  }();
Pn.setDecoderPath("./reference/vendors/draco/"), Pn.preload(), Pn.setWorkerLimit(4);
const An = new class extends Ae {
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.enroll(function (e) {
      return new Ia(e);
    }), this.enroll(function (e) {
      return new Ea(e);
    }), this.enroll(function (e) {
      return new Fa(e);
    }), this.enroll(function (e) {
      return new Ca(e);
    }), this.enroll(function (e) {
      return new Ra(e);
    }), this.enroll(function (e) {
      return new ka(e);
    }), this.enroll(function (e) {
      return new Da(e);
    }), this.enroll(function (e) {
      return new La(e);
    }), this.enroll(function (e) {
      return new Pa(e);
    }), this.enroll(function (e) {
      return new Ua(e);
    });
  }
  load(e, t, s, i) {
    const o = this;
    let a;
    a = "" !== this.resourcePath ? this.resourcePath : "" !== this.path ? this.path : Ie.extractUrlBase(e), this.manager.itemStart(e);
    const n = function (t) {
        i && i(t), o.manager.itemError(e), o.manager.itemEnd(e);
      },
      r = new Ce(this.manager);
    r.setPath(this.path), r.setResponseType("arraybuffer"), r.setRequestHeader(this.requestHeader), r.setWithCredentials(this.withCredentials), r.load(e, function (s) {
      try {
        o.parse(s, a, function (s) {
          t(s), o.manager.itemEnd(e);
        }, n);
      } catch (i) {
        n(i);
      }
    }, s, n);
  }
  setDRACOLoader(e) {
    return this.dracoLoader = e, this;
  }
  setDDSLoader() {
    throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".');
  }
  setKTX2Loader(e) {
    return this.ktx2Loader = e, this;
  }
  setMeshoptDecoder(e) {
    return this.meshoptDecoder = e, this;
  }
  enroll(e) {
    return -1 === this.pluginCallbacks.indexOf(e) && this.pluginCallbacks.push(e), this;
  }
  unenroll(e) {
    return -1 !== this.pluginCallbacks.indexOf(e) && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
  }
  parse(e, t, s, i) {
    let o;
    const a = {},
      n = {};
    if ("string" == typeof e) o = e;else {
      if (Ie.decodeText(new Uint8Array(e, 0, 4)) === za) {
        try {
          a[Oa.KHR_BINARY_GLTF] = new ja(e);
        } catch (c) {
          return void (i && i(c));
        }
        o = a[Oa.KHR_BINARY_GLTF].content;
      } else o = Ie.decodeText(new Uint8Array(e));
    }
    const r = JSON.parse(o);
    if (void 0 === r.asset || r.asset.version[0] < 2) return void (i && i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.")));
    const l = new wn(r, {
      path: t || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    l.fileLoader.setRequestHeader(this.requestHeader);
    for (let h = 0; h < this.pluginCallbacks.length; h++) {
      const e = this.pluginCallbacks[h](l);
      n[e.name] = e, a[e.name] = !0;
    }
    if (r.extensionsUsed) for (let h = 0; h < r.extensionsUsed.length; ++h) {
      const e = r.extensionsUsed[h],
        t = r.extensionsRequired || [];
      switch (e) {
        case Oa.KHR_MATERIALS_UNLIT:
          a[e] = new Aa();
          break;
        case Oa.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
          a[e] = new Ga();
          break;
        case Oa.KHR_DRACO_MESH_COMPRESSION:
          a[e] = new Va(r, this.dracoLoader);
          break;
        case Oa.KHR_TEXTURE_TRANSFORM:
          a[e] = new Ha();
          break;
        case Oa.KHR_MESH_QUANTIZATION:
          a[e] = new qa();
          break;
        default:
          t.indexOf(e) >= 0 && n[e];
      }
    }
    l.setExtensions(a), l.setPlugins(n), l.parse(s, i);
  }
  parseAsync(e, t) {
    const s = this;
    return new Promise(function (i, o) {
      s.parse(e, t, i, o);
    });
  }
}();
export { Ta, Oa, Pa, Aa, Ia, Ca, Ra, ka, Da, La, Ea, Fa, Ua, za, Ba, Na, ja, Va, Ha, Wa, Ga, qa, Ya, Ka, Xa, $a, Za, Ja, Qa, en, tn, sn, on, an, nn, rn, ln, cn, hn, un, dn, pn, fn, mn, gn, yn, bn, vn, wn, _n, xn, Sn, Mn, Tn, On, Pn, An };

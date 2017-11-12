import React, { Component } from 'react'
import {TweenMax, Power2} from "gsap"
import  {
  Scene,
  Engine, 
  AssetsManager,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  Mesh,
  Color3,
  FxaaPostProcess,
  Texture
} from 'babylonjs'




class Scene3d extends Component {

  colors = {
    red : new Color3(0.5137, 0, 0),
    blue :  new Color3(0, 0, 0.5137),
    green : new Color3(0, 0.5137, 0),
    yellow : new Color3(0.5137, 0.5137, 0),
    black : new Color3(0, 0, 0),
    white : new Color3(1, 1, 1),
    grey : new Color3(0.5, 0.5, 0.5),
  }

  regions = {    
    frame : {  id: 'Cadru1', alpha: 6.283185307179586, beta: 1.5707963267948966, radius: 10.038390861264055 },      
    seat : { id: 'Sa', alpha: 8.460744722271127, beta: 0.7251213529780364, radius: 10.038313487331575 },      
    waterbottle : { id: 'BidonRosu', alpha: 5.549944373409927, beta: 1.7457505434456517, radius: 9.999805933906167 },      
    handlebars : { id: 'Ghidon', alpha: 5.218007193438249, beta: 1.042441018904849, radius: 19.999952560667452 },
  }

  constructor(props) {
    super(props);   
    this.moveCamera = this.moveCamera.bind(this)
    this.changeColor = this.changeColor.bind(this)
  }

  moveCamera = (e) => {
    TweenMax.to(this.camera, 1, {
        radius: this.regions[e.detail].radius, 
        alpha: this.regions[e.detail].alpha, 
        beta: this.regions[e.detail].beta,
        ease: Power2.easeOut,
    })
  }

  changeColor = (e) => {
    let mesh = this.scene.getMeshByID(this.regions[e.detail.meshName].id)
    mesh.material = mesh.material.clone()
    TweenMax.to( mesh.material.diffuseColor, 1, {
      r : this.colors[e.detail.color].r, 
      g : this.colors[e.detail.color].g, 
      b : this.colors[e.detail.color].b
    })
  }

  onResizeWindow = () => {
      if (this.engine) {
        this.engine.resize();
      }
  }

  setEngine = () => {
    this.stage.style.width = '100%'
    this.stage.style.height = '100%'
    this.engine = new Engine(
      this.stage,
      true,
      true
    )

    console.log(this.engine)
    
  }

  setScene = () => {
    this.scene = new Scene(this.engine)     
    this.scene.clearColor = new Color3(0.9,0.9,0.92)
  }

  setCamera = () => {
     this.camera = new ArcRotateCamera("Camera", Math.PI * 2, Math.PI / 2, 20, new Vector3( 0, 5, -5 ), this.scene);
     this.camera.attachControl(this.stage, true);
     
  }

  loadModels = () => {
    let loader = new AssetsManager(this.scene)     
    let loadBikeModel = loader.addMeshTask("bike", "", "/", "bike.babylon")
    let modelGroup = new Mesh.CreateBox( "modelGroup", 1, this.scene )
    modelGroup.isVisible = false
    loadBikeModel.onSuccess = ( t ) => {
      console.log(t)       
      
      //frame
      console.log( this.scene.getMeshByID('Cadru1'))
      //seat
      console.log( this.scene.getMeshByID('Sa'))
      //handlebars 
      console.log( this.scene.getMeshByID('Ghidon'))
      // waterbottle
      console.log( this.scene.getMeshByID('BidonRosu'))

      this.scene.getMeshByID('Sa').material = this.scene.getMeshByID('Sa').material.clone()
      this.scene.getMeshByID('Ghidon').material = this.scene.getMeshByID('Ghidon').material.clone()
      this.scene.getMeshByID('BidonRosu').material = this.scene.getMeshByID('BidonRosu').material.clone()
      this.scene.getMeshByID('Furca').material = this.scene.getMeshByID('Furca').material.clone()

      this.scene.getMeshByID('Sa').material.diffuseColor = this.colors['grey']
      this.scene.getMeshByID('Ghidon').material.diffuseColor = this.colors['grey']
      this.scene.getMeshByID('BidonRosu').material.diffuseColor = this.colors['grey']
      this.scene.getMeshByID('Furca').material.diffuseColor = this.colors['black']
      
      this.engine.runRenderLoop(() => { 
       // console.log(this.camera.alpha,this.camera.beta,this.camera.radius )
        this.scene.render() 
      })
      let light = new HemisphericLight('light1', new Vector3(0,1,0), this.scene)
    }
    loadBikeModel.onError = function (task, message, exception) {
        console.log(message, exception);
    }
    return loader
  }


  componentDidMount() {
    this.setEngine()
    this.setScene()
    this.setCamera()
    this.loadModels().load()    
    window.addEventListener('resize', this.onResizeWindow)
    window.addEventListener('move-camera', this.moveCamera)   
    window.addEventListener('change-color', this.changeColor)     
  }

  render() {
    return (
      <canvas className="scene" ref={ el => this.stage = el}>        
      </canvas>
    )
  }

}

export default Scene3d

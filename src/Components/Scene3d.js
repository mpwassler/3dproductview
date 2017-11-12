import React, { Component } from 'react'
import  {
  Scene,
  Engine, 
  AssetsManager,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  Mesh,
  Color3
} from 'babylonjs'



class Scene3d extends Component {

  constructor(props) {
    super(props);   
  }

  onResizeWindow = () => {
      if (this.engine) {
        this.engine.resize();
      }
  }

  setEngine = () => {
    this.stage.style.width = '100%'
    this.stage.style.height = '100vh'
    this.engine = new Engine(
      this.stage,
      true,
      true
    )
  }

  setScene = () => {
    this.scene = new Scene(this.engine)     
    this.scene.clearColor = new Color3(0.85,0.9,0.9)
  }

  setCamera = () => {
     this.camera = new ArcRotateCamera("Camera", Math.PI * 2, Math.PI / 2, 40, new Vector3( 0, 5, -5 ), this.scene);
     this.camera.attachControl(this.stage, true);
  }

  loadModels = () => {
    let loader = new AssetsManager(this.scene)     
    let loadBikeModel = loader.addMeshTask("bike", "", "/", "bike.babylon")
    let modelGroup = new Mesh.CreateBox( "modelGroup", 1, this.scene )
    modelGroup.isVisible = false
    loadBikeModel.onSuccess = ( t ) => {
      console.log(t)
      this.engine.runRenderLoop(() => { this.scene.render() })
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
    window.addEventListener('move-camera', (e) => {
      console.log(e)
    })     
  }

  render() {
    return (
      <canvas className="scene" ref={ el => this.stage = el}>        
      </canvas>
    )
  }

}

export default Scene3d

const box = document.querySelector('.box');
const fun = document.querySelector('.function');
const resetblock = document.querySelector(".resetblock");
const changecolor = document.querySelector('.changecolor');
const rainbow = document.querySelector('.rainbow');
const colorPicker = document.getElementById('colorPicker')
const Slidersize = document.querySelector("span");
const sizeSlider = document.getElementById("sizeSlider");
const clearbtn = document.querySelector(".clear");
let isDrawing = false;
let useRainbow = false;
let currentColor = "black";
let drawnThisStroke = new Set();//在一次连续绘制过程中，每个格子最多只被上色一次,使彩虹笔不再闪烁,记录一次画笔的格子集合
changeBlockSize(16);

//重置画布按钮
resetblock.addEventListener('click',()=>{
  const input = prompt("请输入边长  不要超过100","16");
  const num = parseInt(input);  
  Slidersize.textContent=num+"×"+num;
  sizeSlider.value = num;
  changeBlockSize(num);
})
sizeSlider.addEventListener("input",(e)=>{
  let num = e.target.value;
  Slidersize.textContent=num+"×"+num;
  changeBlockSize(num);
})
clearbtn.addEventListener("click",()=>{
  changeBlockSize(sizeSlider.value);
})
//更改画笔颜色
changecolor.addEventListener("click",()=>{
  const color = prompt("请输入颜色（如 red, #ff0000, rgb(255,0,0)）","black");
  if (color) {
     try {
    // 尝试将输入的颜色转换为标准十六进制
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = color;
    const hexColor = ctx.fillStyle; // 如 "#ff0000"

    // 更新全局画笔颜色
    currentColor = hexColor;
    useRainbow = false;
    rainbow.classList.remove("active");

    // 同步到 colorPicker（必须是 #rrggbb 格式）
    colorPicker.value = hexColor;
    }catch (e) {
    alert("无效的颜色格式，请输入如 red, #ff0000, rgb(255,0,0) 等有效颜色。");}
  }
} );

colorPicker.addEventListener('input',(e)=>{
  currentColor= e.target.value;
  useRainbow=false;
  rainbow.classList.remove("active")
})

//彩虹模式
rainbow.addEventListener("click",()=>{
  rainbow.classList.toggle("active")
  if(rainbow.classList.contains("active")){
    useRainbow = true;
  }else{
    useRainbow = false;
  }
})
//画笔逻辑与颜色控制
//在box内，鼠标按下开始绘制
box.addEventListener("mousedown",(e)=>{
  e.preventDefault()//阻止默认拖拽行为
  isDrawing=true;
  drawnThisStroke=new Set();//开始新画笔，清空记录

  if(e.target.classList.contains("item")){
   // e 就是 mousemove 事件发生时，浏览器创建并传递给你的一个对象，它描述了这次鼠标移动的详细情况,e.target就是触发事件的 DOM 元素（比如你鼠标正悬停的那个 .item 小格子
   e.target.style.backgroundColor=useRainbow?getRandomColor():currentColor;
   drawnThisStroke.add(e.target);//记录这个格子
  }
})
//鼠标松开停止绘制
document.addEventListener("mouseup",()=>{
  isDrawing=false;
 
})
//鼠标按住移动时绘制
box.addEventListener('mousemove',(e)=>{
  if(!isDrawing) return;
  if(e.target.classList.contains('item')&&
    !drawnThisStroke.has(e.target)){
    e.target.style.backgroundColor=useRainbow?getRandomColor():currentColor;
    drawnThisStroke.add(e.target);
  }
})

function changeBlockSize(num){

  while(box.firstChild){
    box.removeChild(box.firstChild)//清除画布
  }
  for(let i = 0;i<num;i++){
    const div = document.createElement('div')
    for(let i = 0 ;i<num;i++){
      const div2 = document.createElement('div');
      div2.style.cssText="flex:1;"
      div2.className ='item';
      div.appendChild(div2);
    }
    div.style.cssText = " display:flex;flex:1;justify-content:space-between "
    box.appendChild(div);
  }

}
function getRandomColor(){
  const letter = '0123456789ABCDEF'
  let color = "#"
  for(let i = 0 ; i< 6;i++){
    color+=letter[Math.floor(Math.random()*16)];
  }
  return color;
}




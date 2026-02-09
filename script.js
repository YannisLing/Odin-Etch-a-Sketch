const box = document.querySelector('.box');
const fun = document.querySelector('.function');
const resetblock = document.querySelector(".resetblock");

changeBlockSize(16);

resetblock.addEventListener('click',()=>{
  const input = prompt("请输入边长  不要超过100","16");
  const num = parseInt(input);  
  changeBlockSize(num);
})

function changeBlockSize(num){

  while(box.firstChild){
    box.removeChild(box.firstChild)//清除box
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
  changeColor("black");
}
function changeColor(color){
  const item = document.querySelectorAll(".item");
  item.forEach(element => {
    element.addEventListener("mouseenter",()=>{
      element.style["background-color"]=color;
    })
  });
}




let showAll;
let dataForShowAll;
const loadData=async()=>{
  const res=await fetch(`https://openapi.programming-hero.com/api/ai/tools`)
  let data=await res.json();
  data=data.data.tools;

  displayInformationOfCard(data)
  displayUsingSortByDate(data)
}
const displayInformationOfCard=(data)=>{
   dataForShowAll=data
   const cardContainer=document.getElementById('card-container') 
   console.log(data.length)
   const showAllBtn=document.getElementById('see-more')
   if(data.length>6 && !showAll){
      data=data.slice(0,6)
      showAllBtn.classList.remove('hidden')
   }
   else{
      showAllBtn.classList.add('hidden')
   }
   cardContainer.textContent='';
   
   data.forEach((feature)=>{
      const div=document.createElement('div') 
    //   Getting features Items
      const FeatureItems =feature?.features
      div.classList=`card w-9/12 md:w-80 lg:w-96 bg-base-100 shadow-xl`
      div.innerHTML=`
      
                    <figure><img src=${feature.image} alt="Features Image"  onerror="setDefaultImage(this)"/>
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">Features</h2>
                    </div>
                
      `
      const divInner1=document.createElement('div');
      divInner1.classList='pl-8 space-y-1 mt-5 mb-10'
      let count=0;
      FeatureItems.forEach((item)=>{
        ++count;
        const p=document.createElement('p');
        p.innerText=`${count}. ${item}`;
        divInner1.appendChild(p)

      })
      div.appendChild(divInner1)
      const divInner2=document.createElement('div');
      
      divInner2.innerHTML=`<div class="card-body">
      <h2 class="card-title">${feature?.name}</h2>
      <div class="flex gap-2 items-center">
      <img src="./images/Frame.jpg" alt="">
      <p>${feature.published_in}</p>
      </div>
      
   </div>`
      div.appendChild(divInner2);
      cardContainer.appendChild(div)
      

     
   })
   
}
function setDefaultImage(imageElement) {
    imageElement.src = "./images/default_image.jpg";
}



loadData()
let sortByDateToggle=false;
const displayUsingSortByDate=(data)=>{
   document.getElementById('sort-by-date').addEventListener('click',()=>{
      if(!sortByDateToggle){
         const sortedData=data.slice().sort((a,b)=>{
            let date1=new Date(a.published_in);
            let time1=date1.getTime(date1)
            let date2=new Date(b.published_in);
            let time2=date2.getTime(date2)
            return time1-time2; 
         })
         sortByDateToggle=true;
         displayInformationOfCard(sortedData) 
      }
      else{
         sortByDateToggle=false;
         displayInformationOfCard(data)
      }         
   }) 
}
const enableShowAll=(value)=>{
   showAll=value;
   displayInformationOfCard(dataForShowAll)
}
const showAllBtn=document.getElementById('see-more')
showAllBtn.addEventListener('click',()=>{
   enableShowAll(true)
})



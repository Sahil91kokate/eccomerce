import React from 'react';

const getTheLookData = [
  {
    image: 'img/11.jpg',
    title: 'Jackets',
  },
  {
    image: 'img/15.jpg',
    title: 'Jeans',
  },
  {
    image: 'img/16.jpg',
    title: 'Hoodies',
  },
  {
    image: 'img/14.jpg',
    title: 'Shoes',
  },
];

export default function GetTheLook() {
  return (
    <div className="container-sm pt-5 pb-3" style={{width:"100%"}} >
      <h4 className="section-title text-center position-relative mx-auto mb-4" style={{width:"100%"}}>
        <span className="pr-3">Get the look</span>
      </h4>
      <div className="row px-xl-5" >
        {getTheLookData.map((item, index) => (
          <div key={index} className="col-6 col-md-3" style={{ padding: '4px' }}>
            <div className={` mb-4${index % 2 === 0 ? ' mb-md-0' : ''}`} style={{ height: '300px' }}>
              <img className="img-fluid custom-img" src={item.image} alt={item.title} />
              <div className="offer-text">
                <h3 className="text-dark mb-3">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

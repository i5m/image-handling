setTimeout(() => {
    
    var imgs = document.getElementsByTagName('img');
    
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].src = `http://localhost:7000/images?extent=0.3&type_=trit&image_url=${imgs[i].src}`;
    }
    
}, 2000);

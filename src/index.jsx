import './style.css';

let banner = {
    self : this,
    background1: 'white',
    background2: '#ffe5b4',
    text1: 'Введите текст 1',
    text2: 'Введите текст 2',
    fontsize1: '24px',
    fontsize2: '24px',
    colorText1: 'gray',
    colorText2: 'gray',
    photo: '',
    text1x: 20,
    text1y: 20,
    text2x: 20,
    text2y: 60,
    coordinatesImgX: 0,
    coordinatesImgY: 0,
    widthPhoto: 100,
    heightPhoto: 100,
    ahref: '#',

    draw: function(){
        let b_canvas = document.getElementById("b");
        let b_context = b_canvas.getContext("2d");
        let my_gradient = b_context.createLinearGradient(0, 0, 400, 0);
        my_gradient.addColorStop(0, this.background1);
        my_gradient.addColorStop(1, this.background2);
        b_context.fillStyle = my_gradient;
        b_context.fillRect(0, 0, 400, 400);
        b_context.strokeStyle = "black";
        b_context.stroke();
        b_context.fillStyle = this.colorText1;
        b_context.textBaseline = "top";
        b_context.font = `normal ${this.fontsize1} sans-serif`;
        wrapText(b_context, this.text1, this.text1x, +this.text1y, 400 - this.text1x, 20);
        b_context.fillStyle = this.colorText2;
        b_context.textBaseline = "top";
        b_context.font = `normal ${this.fontsize2} sans-serif`;
        wrapText(b_context, this.text2, this.text2x, +this.text2y, 400 - this.text2x, 20);

        let image = new Image();
        image.crossOrigin = "anonymous";  // This enables CORS
        image.src = this.photo;
        let coordinatesImgX = this.coordinatesImgX;
        let coordinatesImgY = this.coordinatesImgY;
        let widthPhoto = this.widthPhoto;
        let heightPhoto = this.heightPhoto;
        image.onload = function() {
            console.log(123);
            b_context.drawImage(image, coordinatesImgX, coordinatesImgY, widthPhoto, heightPhoto);
        };

    },
    editBackground: function () {
        let self = this;
        let select = document.getElementById("select1");
        let select2 = document.getElementById("select2");
        self.background1 = select.options[select.selectedIndex].value;
        self.background2 = select2.options[select2.selectedIndex].value;
        self.draw();
    },
    enterText: function () {
        let self = this;
        self.text1 = document.getElementById("text1").value;
        self.text2 = document.getElementById("text2").value;
        self.draw();
    },
    choiceFontsize: function () {
        let self = this;
        self.fontsize1 = document.getElementById("fontsize1").value;
        self.fontsize2 = document.getElementById("fontsize2").value;
        self.draw();
    },
    editColor: function () {
        let self = this;
        let textColor1 = document.getElementById("textColor1");
        let textColor2 = document.getElementById("textColor2");
        self.colorText1 = textColor1.options[textColor1.selectedIndex].value;
        self.colorText2 = textColor2.options[textColor2.selectedIndex].value;
        self.draw();
    },
    editPhoto: function () {
        let self = this; //чтобы зис не потерялся и не переопределился случайно
        self.photo = document.getElementById("photo").value;
        self.draw();
    },
    downloadPng: function (){
        document.getElementById("downloader").download = "image.png";
        document.getElementById("downloader").href = document.getElementById("b")
            .toDataURL("image/png")
            .replace(/^data:image\/png/,'data:application/octet-stream');
    },
    editText1xy: function () {
        let self = this;
        self.text1x = document.getElementById("text1x").value;
        self.text1y = document.getElementById("text1y").value;
        self.draw();
    },
    editText2xy: function () {
        let self = this;
        self.text2x = document.getElementById("text2x").value;
        self.text2y = document.getElementById("text2y").value;
        self.draw();
    },
    editCoordinatesImgXY: function () {
        let self = this;
        self.coordinatesImgX = document.getElementById("coordinatesImgX").value;
        self.coordinatesImgY = document.getElementById("coordinatesImgY").value;
        self.draw();
    },
    editWidthHeight: function () {
        let self = this;
        self.widthPhoto = document.getElementById("widthPhoto").value;
        self.heightPhoto = document.getElementById("heightPhoto").value;
        self.draw();
    },
    editHref: function () {
        let self = this;
        self.ahref = document.getElementById("ahref").value;
    }
}

banner.draw();

function downloadJson(){
    let banner2 = {
        background1: banner.background1,
        background2: banner.background2,
        text1: banner.text1,
        text2: banner.text2,
        fontsize1: banner.fontsize1,
        fontsize2: banner.fontsize2,
        colorText1: banner.colorText1,
        colorText2: banner.colorText2,
        photo: banner.photo,
        text1x: banner.text1x,
        text1y: banner.text1y,
        text2x: banner.text2x,
        text2y: banner.text2y,
        widthPhoto: banner.widthPhoto,
        heightPhoto: banner.heightPhoto,
    };
    let json = JSON.stringify(banner2);
    copyToClipboard(json);
}

function copyToClipboard(str) {
    let area = document.createElement('textarea');
    document.body.appendChild(area);
    area.value = str;
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
}
function downloadHtml(banner) {
    let bannerHtml = document.getElementById('banner-html'); //контейнер для баннера
    let href = document.createElement('a');
    href.setAttribute('href', banner.ahref);
    let divHtml = document.createElement("div"); //див отвечает за фон
    divHtml.setAttribute('style', `background: linear-gradient(to right, ${banner.background1}, ${banner.background2}); width: 400px; height: 400px`);
    bannerHtml.append(href);
    href.append(divHtml);

    let p1 = document.createElement("p");
    p1.innerHTML = banner.text1;
    p1.setAttribute('style', `font-size: ${banner.fontsize1}; color: ${banner.colorText1}; position: absolute; left: ${banner.text1x}; top: ${banner.text1y};`);
    divHtml.append(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = banner.text2;
    p2.setAttribute('style', `font-size: ${banner.fontsize2}; color: ${banner.colorText2}; position: absolute; left: ${banner.text2x}; top: ${banner.text2y};`);
    divHtml.append(p2);

    let img = document.createElement("img");
    img.setAttribute('style', `width: ${banner.widthPhoto}; height: ${banner.heightPhoto}; position: absolute; left: ${banner.coordinatesImgX}; top: ${banner.coordinatesImgY};`);
    img.setAttribute('src', banner.photo);
    divHtml.append(img);
    copyToClipboard(bannerHtml.innerHTML);
}

document.getElementById('downloader-html').onclick = function(){
    downloadHtml(banner);
};

document.getElementById('select1').onchange = function(){
    banner.editBackground();
};
document.getElementById('select2').onchange = function(){
    banner.editBackground();
};
document.getElementById('text1').onchange = function(){
    banner.enterText();
};
document.getElementById('text2').onchange = function(){
    banner.enterText();
};
document.getElementById('fontsize1').onchange = function(){
    banner.choiceFontsize();
};
document.getElementById('fontsize2').onchange = function(){
    banner.choiceFontsize();
};
document.getElementById('textColor1').onchange = function(){
    banner.editColor();
};
document.getElementById('textColor2').onchange = function(){
    banner.editColor();
};
document.getElementById('photo').onchange = function(){
    banner.editPhoto();
};
document.getElementById('downloader').onclick = function(){
    banner.downloadPng();
};
document.getElementById('downloader-json').onclick = function(){
    downloadJson(banner);
};
document.getElementById('text1x').onchange = function(){
    banner.editText1xy();
};
document.getElementById('text1y').onchange = function(){
    banner.editText1xy();
};
document.getElementById('text2x').onchange = function(){
    banner.editText2xy();
};
document.getElementById('text2y').onchange = function(){
    banner.editText2xy();
};

document.getElementById('coordinatesImgX').onchange = function(){
    banner.editCoordinatesImgXY();
};
document.getElementById('coordinatesImgY').onchange = function(){
    banner.editCoordinatesImgXY();
};
document.getElementById('widthPhoto').onchange = function(){
    banner.editWidthHeight();
};
document.getElementById('heightPhoto').onchange = function(){
    banner.editWidthHeight();
};

document.getElementById('ahref').onchange = function(){
    console.log(123);
    banner.editHref();
};

//функция разбиения строки на несколько строк (чтобы убиралось внутри баннера)
function wrapText(context, text, x, y, line_width, line_height)
{
    var line = '';
    var paragraphs = text.split('\n');
    for (var i = 0; i < paragraphs.length; i++)
    {
        var words = paragraphs[i].split(' ');

        for (var n = 0; n < words.length; n++)
        {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > line_width && n > 0)
            {
                context.fillText(line, x, y);
                console.log(line, x, y);
                line = words[n] + ' ';
                y += Number(line_height);
            }
            else
            {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
        y += Number(line_height);
        line = '';
    }
}




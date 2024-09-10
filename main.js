$(function () {
    const video = $("video")[0];
    var model;
    var cameraMode = "environment"; // veya "user"
    var oncekiTahminSinifi = new Set();
    var sonGosterilenTahminler = new Set();
    var isSpeaking = false;

    const ilacBilgileri = {
        "İBURAMIN-COLD": {
            bilgi: "Soğuk algınlığı ve grip semptomlarının hafifletilmesinde kullanılır.",
            kullanim: "Günde 3 defa alınmalıdır."
        },
        "FERAMAT": {
            bilgi: "Demir eksikliği anemisinin tedavisinde kullanılır.",
            kullanim: "Günde 1 defa alınmalıdır."
        },
        "KEYRELAKS": {
    bilgi: "Kas gevşetici olarak kullanılır.",
    kullanim: "Günde 2-3 defa alınmalıdır."
},
        "ARVELES": {
            bilgi: "Oldukça etkili bir ağrı kesici ilaçtır ve genellikle şiddetli ağrıların hafifletilmesi için reçete edilir. İçeriğindeki aktif bileşenler sayesinde, vücuttaki ağrı sinyallerini bloke ederek hızlı ve etkili bir şekilde rahatlama sağlar.",
            kullanim: "Günde 2 defa bir tablet alınmalıdır."
        },
        "KEYRELAİKS": {
            bilgi: "Kas gevşetici olarak kullanılır.",
            kullanim: "Günde 2-3 defa alınmalıdır."
        },
        "PIYELOSEPTYL": {
            bilgi: "İdrar yolu enfeksiyonlarının tedavisinde kullanılır.",
            kullanim: "Günde 2 defa alınmalıdır."
        },
        "COVERSYL": {
            bilgi: "Yüksek tansiyon ve kalp yetmezliği tedavisinde kullanılır.",
            kullanim: "Günde 1 defa alınmalıdır."
        },
        "ZOPROTEC": {
            bilgi: "Yüksek tansiyon ve kalp yetmezliği tedavisinde kullanılır.",
            kullanim: "Günde 1 defa alınmalıdır."
        },
        "ENFLUVIR": {
            bilgi: "Grip tedavisinde ve profilaksisinde kullanılır.",
            kullanim: "Günde 2 defa alınmalıdır."
        },
        "ALLERSET": {
            bilgi: "Alerji semptomlarının tedavisinde kullanılır.",
            kullanim: "Günde 1 defa alınmalıdır."
        },
        "MAGNORM": {
            bilgi: "Magnezyum eksikliğinin tedavisinde kullanılır.",
            kullanim: "Günde 1 defa alınmalıdır."
        },
        "ASPRIN": {
            bilgi: "Ağrı kesici, ateş düşürücü ve antienflamatuar özelliklere sahip bir ilaçtır. Aynı zamanda kan sulandırıcı olarak kullanılır.",
            kullanim: "Günde 1-2 defa alınmalıdır."
        },
        "MATOFIN": {
            bilgi: "Tip 2 diyabet tedavisinde kullanılır.",
            kullanim: "Günde 2-3 defa yemeklerden sonra alınmalıdır."
        },
        "ZOVIRAX": {
            bilgi: "Uçuk ve herpes virüsü enfeksiyonlarının tedavisinde kullanılır.",
            kullanim: "Günde 5 defa uygulanmalıdır."
        },
        "GRİPORT-COLD": {
            bilgi: "Soğuk algınlığı ve grip semptomlarının hafifletilmesinde kullanılır.",
            kullanim: "Günde 3 defa alınmalıdır."
        },
        "DODEX": {
            bilgi: "Yüksek dozda B12 vitamini, siyatik ve trigeminus nevraljisi gibi nörolojik endikasyon sahalarında kullanılır ve şiddetli ağrıların süratle giderilmesini sağlar.",
            kullanim: "Haftada 1 kez enjeksiyon olarak uygulanır."
        },
        "BULSEF": {
            bilgi: "Bakteriyel enfeksiyonların tedavisinde kullanılır.",
            kullanim: "Günde 2 defa alınmalıdır."
        },
        "VASOXEN": {
            bilgi: "Yüksek tansiyon tedavisinde kullanılır.",
            kullanim: "Günde 1 defa alınmalıdır."
        },
        "SPASMOMEN": {
            bilgi: "Bağırsak spazmlarının tedavisinde kullanılır.",
            kullanim: "Günde 2-3 defa alınmalıdır."
        },
        "CROXILEX": {
            bilgi: "Geniş spektrumlu bir antibiyotiktir ve çeşitli enfeksiyonların tedavisinde kullanılır.",
            kullanim: "Günde 2 defa alınmalıdır."
        },
        "FERTAMIR": {
            bilgi: "Demir eksikliği anemisi ve vitamin eksikliklerinin tedavisinde kullanılan bir ilaçtır.",
            kullanim: "Günde 1 defa alınmalıdır."
        },
        "MAGVITAL": {
            bilgi: "Magnezyum eksikliğinin tedavisinde kullanılır.",
            kullanim: "Günde 1 defa alınmalıdır."
        },
        "ZINCFORT": {
            bilgi: "Çinko eksikliğinin tedavisinde kullanılır.",
            kullanim: "Günde 1 defa alınmalıdır."
        },
        "GYNO-FERRO-SANOL": {
            bilgi: "Gebelik ve emzirme döneminde demir ve folik asit eksikliğini gidermek için kullanılır.",
            kullanim: "Günde 1 defa alınmalıdır."
        },
        "SELECTRA": {
            bilgi: "Depresyon ve anksiyete bozukluklarının tedavisinde kullanılan bir antidepresandır.",
            kullanim: "Günde 1 defa alınmalıdır."
        },
        "NAC": {
            bilgi: "Asetilsistein içeren bir ilaçtır ve balgam söktürücü olarak kullanılır.",
            kullanim: "Günde 2-3 defa alınmalıdır."
        },
        "BEKUNIS": {
            bilgi: "Bağırsak mukozasına direkt etki ile bağırsak hareketlerini ve içeriğinin geçiş hızını arttırır, su ve elektrolit salgılanmasını engeller.",
            kullanim: "Yatmadan önce bir tablet alınmalıdır."
        },
        "İBURAMIN-ZERO": {
            bilgi: "Soğuk algınlığı ve grip semptomlarının hafifletilmesinde kullanılır.",
            kullanim: "Günde 3 defa alınmalıdır."
        },
        "ASEKET-TİYO": {
            bilgi: "Ağrı ve iltihap tedavisinde kullanılan bir nonsteroid antiinflamatuar ilaçtır.",
            kullanim: "Günde 1-2 defa alınmalıdır."
        },
        "KLAMOKS": {
            bilgi: "Bakteriyel enfeksiyonların tedavisinde kullanılan geniş spektrumlu bir antibiyotiktir.",
            kullanim: "Günde 2 defa alınmalıdır."
        },
        "A-FERİN": {
            bilgi: "Grip ve soğuk algınlığına bağlı burun akıntısı, aksırma, burun ve boğazda kaşıntı, baş ağrısı, adale ağrısı, boğaz ağrısı, vücut kırıklığı, ateş, nezle, gözlerde sulanma ve kaşıntı gibi durumlara eşlik eden kuru öksürüğün tedavisinde kullanılır.",
            kullanim: "Günde 3 defa yemeklerden sonra alınmalıdır."
        },
        "DEVİT-3": {
            bilgi: "D vitamini eksikliği tedavisinde kullanılan bir ilaçtır.",
            kullanim: "Günde 1 defa alınmalıdır."
        },
        "MAJEZİK": {
            bilgi: "Parasetamol ve propifenazon içeren bir ilaçtır. Baş ağrısı, migren ve diğer ağrıların tedavisinde kullanılır.",
            kullanim: "Günde 1 defa bir tablet alınmalıdır."
        },
        "TERAGRİP": {
            bilgi: "Soğuk algınlığı ve grip semptomlarının hafifletilmesinde kullanılır.",
            kullanim: "Günde 3 defa alınmalıdır."
        },
        "CORTAİR": {
            bilgi: "Astım ve alerjik rinit gibi inflamatuar durumların tedavisinde kullanılan bir kortikosteroid inhaleridir.",
            kullanim: "Günde 2 defa kullanılır."
        },
        "GRİBEX": {
            bilgi: "Soğuk algınlığı ve grip semptomlarının hafifletilmesinde kullanılır.",
            kullanim: "Günde 3 defa alınmalıdır."
        },
        "PAROL": {
            bilgi: "Genellikle hafif ve orta şiddette ağrıları gidermek için kullanılan bir ağrı kesici ilaçtır. İçeriğinde bulunan etken madde, vücuttaki ağrıyı azaltarak rahatlama sağlar.",
            kullanim: "Günde 3-4 defa bir tablet alınmalıdır."
        },
        "AUGMENTIN": {
            bilgi: "Bakteriyel enfeksiyonların tedavisinde kullanılan geniş spektrumlu bir antibiyotiktir.",
            kullanim: "Günde 2 defa alınmalıdır."
        },
        "DICLOFLAM": {
            bilgi: "Dicloflam potasyum içeren bir ilaçtır. Ağrı, iltihap ve ateşin tedavisinde kullanılır.",
            kullanim: "Günde 2-3 defa yemeklerle birlikte alınmalıdır."
        },
        "EVİN": {
            bilgi: "Alerjik reaksiyonların tedavisinde kullanılan bir antihistamindir.",
            kullanim: "Günde 1 defa alınmalıdır."
        },
        "PONSTAN-FORTE": {
            bilgi: "Adet ağrısı tedavisinde PONSTAN FORTE ağrı başlarken uygulanmalıdır. 16 yaşından küçük ergenlerde adet ağrısının PONSTAN FORTE ile tedavisi kanıtlanmamıştır.",
            kullanim: "Adet ağrısının başlaması ile birlikte alınmalıdır."
        },
        "APRANAX-FORT": {
            bilgi: "Ağrı ve iltihap tedavisinde kullanılan bir nonsteroid antiinflamatuar ilaçtır.",
            kullanim: "Günde 2 defa alınmalıdır."
        },
        "DİPROMED": {
            bilgi: "Enfeksiyonlara karşı kullanılan geniş spektrumlu bir antibiyotiktir.",
            kullanim: "Günde 2 defa alınmalıdır."
        },
        "DETOFEN": {
            bilgi: "Ağrı ve iltihap tedavisinde kullanılan bir nonsteroid antiinflamatuar ilaçtır.",
            kullanim: "Günde 2-3 defa alınmalıdır."
        },
        "NAZALNEM": {
            bilgi: "Burun tıkanıklığını gidermek için kullanılan bir nazal sprey veya damladır.",
            kullanim: "Günde 2-3 defa kullanılır."
        },
        "FASTJEL": {
            bilgi: "Kas ve eklem ağrılarının tedavisinde kullanılan bir jel formunda ilaçtır.",
            kullanim: "Günde 2-3 defa ağrılı bölgeye uygulanmalıdır."
        },
        "DESYREL": {
            bilgi: 
"Anksiyetenin eşlik ettiği depresyon dahil yetişkinlerde depresyon tedavisinde kullanılır.",
kullanim: "Günde 1 defa yatmadan önce alınmalıdır."
},
"BİLAXTEN": {
bilgi: "Alerji semptomlarının tedavisinde kullanılan bir antihistamindir.",
kullanim: "Günde 1 defa alınmalıdır."
},
"ANDOREX": {
bilgi: "Ağız ve boğaz enfeksiyonlarının tedavisinde kullanılan antiseptik bir gargara veya sprey formundadır.",
kullanim: "Günde 3-4 defa kullanılır."
},
"HAMETAN": {
bilgi: "Cilt yaraları ve yanıkların tedavisinde kullanılan bir kremdir.",
kullanim: "Günde 2-3 defa etkilenen bölgeye uygulanmalıdır."
},
"BENEXOL": {
bilgi: "B vitaminlerinin eksikliğini gidermek için kullanılır.",
kullanim: "Günde 1 defa alınmalıdır."
}
};
        
    
    const getIlacBilgileri = function (ilacAdi) {
        const formattedIlacAdi = ilacAdi.trim().toUpperCase();
        const ilac = ilacBilgileri[formattedIlacAdi];
        if (ilac) {
            $("#predictions").html(`
                <p><strong>İlaç Bilgisi:</strong> ${ilac.bilgi}</p>
                <p><strong>İlaç Kullanımı:</strong> ${ilac.kullanim}</p>
            `);
        } else {
            $("#predictions").html(`<p>${ilacAdi}: Bilgi bulunamadı.</p>`);
        }
    };

    const clearIlacBilgileri = function () {
        $("#predictions").html("");
        oncekiTahminSinifi.clear();
        sonGosterilenTahminler.clear();
    };

    const startVideoStreamPromise = navigator.mediaDevices
        .getUserMedia({
            audio: false,
            video: {
                facingMode: cameraMode
            }
        })
        .then(function (stream) {
            return new Promise(function (resolve) {
                video.srcObject = stream;
                video.onloadeddata = function () {
                    video.play();
                    resolve();
                };
            });
        })
        .catch(function (err) {
            console.error("Kamera erişim hatası: ", err);
            alert("Kamera erişim hatası: " + err.message);
        });


    var publishable_key = "rf_NBEZWVH2CkVrj6meswkwG87GDAB3";
    var toLoad = {
        model: "yeni_ilaclar",
        version: 5
    };

    const loadModelPromise = new Promise(function (resolve, reject) {
        roboflow
            .auth({
                publishable_key: publishable_key
            })
            .load(toLoad)
            .then(function (m) {
                model = m;
                resolve();
            })
            .catch(function (err) {
                console.error("Model yükleme hatası: ", err);
                alert("Model yükleme hatası: " + err.message);
                reject(err);
            });
    });

    Promise.all([startVideoStreamPromise, loadModelPromise]).then(function () {
        $("body").removeClass("loading");
        resizeCanvas();
        detectFrame();
    });

    var canvas, ctx;
    const font = "16px sans-serif";

    function videoDimensions(video) {
        var videoRatio = video.videoWidth / video.videoHeight;
        var width = video.offsetWidth,
            height = video.offsetHeight;
        var elementRatio = width / height;

        if (elementRatio > videoRatio) {
            width = height * videoRatio;
        } else {
            height = width / videoRatio;
        }

        return {
            width: width,
            height: height
        };
    }

    $(window).resize(function () {
        resizeCanvas();
    });

    const resizeCanvas = function () {
        $("canvas").remove();
        canvas = $("<canvas/>");
        ctx = canvas[0].getContext("2d");
        var dimensions = videoDimensions(video);

        canvas[0].width = video.videoWidth;
        canvas[0].height = video.videoHeight;

        canvas.css({
            width: dimensions.width,
            height: dimensions.height,
            left: ($(window).width() - dimensions.width) / 2,
            top: ($(window).height() - dimensions.height) / 2
        });

        $("body").append(canvas);
    };

    var prevTime;
    var pastFrameTimes = [];

    const detectFrame = function () {
        if (!model) return requestAnimationFrame(detectFrame);

        model.detect(video).then(function (predictions) {
            requestAnimationFrame(detectFrame);
            if (!isSpeaking) {
                renderPredictions(predictions);
            }

            if (prevTime) {
                pastFrameTimes.push(Date.now() - prevTime);
                if (pastFrameTimes.length > 30) pastFrameTimes.shift();

                var total = 0;
                pastFrameTimes.forEach(function (t) {
                    total += t / 1000;
                });

                var fps = pastFrameTimes.length / total;
                $("#fps").text(Math.round(fps));
            }
            prevTime = Date.now();
        }).catch(function (e) {
            console.error("Hata: ", e);
            requestAnimationFrame(detectFrame);
        });
    };

    const renderPredictions = function (predictions) {
        var dimensions = videoDimensions(video);
        var scale = 1;
        var detectedClasses = new Set();

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        predictions.forEach(function (prediction) {
            const x = prediction.bbox.x;
            const y = prediction.bbox.y;
            const width = prediction.bbox.width;
            const height = prediction.bbox.height;

            ctx.strokeStyle = prediction.color;
            ctx.lineWidth = 4;
            ctx.strokeRect(
                (x - width / 2) / scale,
                (y - height / 2) / scale,
                width / scale,
                height / scale
            );

            ctx.fillStyle = prediction.color;
            const textWidth = ctx.measureText(prediction.class).width;
            const textHeight = parseInt(font, 10);
            ctx.fillRect(
                (x - width / 2) / scale,
                (y - height /
                2) / scale,
                textWidth + 8,
                textHeight + 4
            );

            ctx.font = font;
            ctx.textBaseline = "top";
            ctx.fillStyle = "#000000";
            ctx.fillText(
                prediction.class,
                (x - width / 2) / scale + 4,
                (y - height / 2) / scale + 1
            );

            detectedClasses.add(prediction.class);
            if (!sonGosterilenTahminler.has(prediction.class)) {
                isSpeaking = true;
                const ilacAdi = prediction.class.trim().toUpperCase();
                getIlacBilgileri(ilacAdi);

                const ilac = ilacBilgileri[ilacAdi];
                const seslemeMetni = ilac ? `${prediction.class}. İlaç Bilgisi: ${ilac.bilgi} İlaç Kullanımı: ${ilac.kullanim}` : `${prediction.class}. Bilgi bulunamadı.`;
                const sesleme = new SpeechSynthesisUtterance(seslemeMetni);
                sesleme.lang = "tr-TR";
                sesleme.onend = function () {
                    isSpeaking = false;
                    clearIlacBilgileri();
                };
                speechSynthesis.speak(sesleme);

                sonGosterilenTahminler.add(prediction.class);
            }
        });

        // Tespit edilmeyen sınıfları kaldır
        oncekiTahminSinifi.forEach(ilacAdi => {
            if (!detectedClasses.has(ilacAdi)) {
                sonGosterilenTahminler.delete(ilacAdi);
            }
        });

        oncekiTahminSinifi = detectedClasses;
    };

    detectFrame();
});

class MoneyCounter {
    constructor(initialValue, endValue, duration, textStyle) {
        this.value = initialValue;
        this.endValue = endValue;
        this.duration = duration;

        // Создание текстового объекта для счетчика
        this.text = new PIXI.Text(`Money: $${initialValue}`, textStyle);
        

        // Запуск анимации
        this.animateCounter(initialValue, endValue, duration);
        app.resizes.add( this.onResize ); 
    }

    updateCounter(value) {
        this.text.text = `Money: $${Math.floor(value)}`;
    }

    animateCounter(startValue, endValue, duration) {
        gsap.to({ value: startValue }, {
            duration: duration,
            value: endValue,
            onUpdate: () => {
                this.updateCounter(this.targets()[0].value);
            },
            ease: 'power1.inOut'
        });
    }

    addToStage(stage) {
        stage.addChild(this.text);
    }

    onResize = ({ isPortraite, leftUI, rightUI, upUI, downUI }) => {               
        if (isPortraite) {
        } else {
        }
    }
}
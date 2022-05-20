import './sass/app.scss';
import './slider';

const select = document.querySelector('.header__select');
const selectContainer = select.querySelector('.header__select-list');
const selectItems = select.querySelectorAll('.header__select-item');
const selectText = select.querySelector('.header__select-text');

const onClickSelectItem = (evt) => {
    selectContainer.classList.add('header__select-list--disabled');
    selectText.textContent=evt.target.textContent;
    selectItems.forEach(element => {
        element.removeEventListener('click', onClickSelectItem)
    });
    select.addEventListener('click', onClickSelect, true);
    document.removeEventListener('click', onClickCloseSelect)
}

const onClickCloseSelect = () => {
    document.removeEventListener('click', onClickCloseSelect)
    selectContainer.classList.add('header__select-list--disabled');
    select.addEventListener('click', onClickSelect, true);
}

const onClickSelect = () => {
    select.removeEventListener('click', onClickSelect);
    selectContainer.classList.remove('header__select-list--disabled');
    document.addEventListener('click', onClickCloseSelect, true)
    selectItems.forEach(element => {
        element.addEventListener('click', onClickSelectItem)
    });
}

select.addEventListener('click', onClickSelect, true);

const buttons = document.querySelector('.branches__buttons')
const buttonClass = buttons.querySelector('.branches__button--class')
const buttonAvto = buttons.querySelector('.branches__button--avto')
const listClass = document.querySelector('.branches__list--class')
const listAvto = document.querySelector('.branches__list--avto')

buttons.addEventListener('click', (event) => {
    if(event.target.textContent === 'Учебные классы') {
        buttonAvto.classList.remove('branches__button--active')
        buttonClass.classList.add('branches__button--active')
        listAvto.classList.add('branches__list--disabled')
        listClass.classList.remove('branches__list--disabled')

    } else if(event.target.textContent === 'Автодром') {
        buttonClass.classList.remove('branches__button--active')
        buttonAvto.classList.add('branches__button--active')
        listAvto.classList.remove('branches__list--disabled')
        listClass.classList.add('branches__list--disabled')
    }
})

const questionsButtons = document.querySelectorAll('.questions__button')

const onClickQuestionButton = () => {
    questionsButtons.forEach(button => {
        let buttonActive = false
        let activeItem = document.querySelector(".questions__item-" + button.id)
        let activeButton = activeItem.querySelector(".questions__button")
        let activeText = activeItem.querySelector('.questions__container')
        button.addEventListener('click', () => {
            if (buttonActive === false) {
                activeItem.classList.add('questions__item--active')
                activeButton.classList.add('questions__button--active')
                activeText.classList.add('questions__container--active')
                buttonActive = true
            } 
            else if (buttonActive) {
                activeItem.classList.remove('questions__item--active')
                activeButton.classList.remove('questions__button--active')
                activeText.classList.remove('questions__container--active')
                buttonActive = false
            }
        })
    });
}

onClickQuestionButton()

const mapButton = document.querySelector('.map__button')
const mapList = document.querySelector('.map__list')
const mapItems = mapList.querySelectorAll('.map__item')
const mapText = document.querySelector('.map__text')

mapButton.addEventListener('click', () => {
    mapList.classList.add('map__list--active')
    document.addEventListener('click', () => {
        mapList.classList.remove('map__list--active')
    }, true)
})

mapItems.forEach(item => {
    item.addEventListener('click', (evt) => {
        mapText.textContent = evt.target.textContent
        mapList.classList.remove('map__list--active')
    })
})

window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});

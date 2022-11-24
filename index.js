document.addEventListener('DOMContentLoaded', () => {
    const telElement = document.getElementById('tel') // ищем наш единственный input
    const innElement = document.getElementById('inn')
    const maskOptions = { // создаем объект параметров
      mask: '+{7}(000)000-00-00' // задаем единственный параметр mask
    }
    const innMask = {
      mask: '000000000000'
    }
    IMask(telElement, maskOptions) // запускаем плагин с переданными параметрами
    IMask(innElement, innMask) // запускаем плагин с переданными параметрами
})
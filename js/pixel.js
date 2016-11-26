$(document).ready(function () {
    // Variables des boutons
    var pH = $("input[name='pH']").val();
    var pW = $("input[name='pW']").val();
    // Variables mémoire des boutons
    var pHid = 0;
    var pWid = 0;
    // Variables des valeurs couleur et pixel
    var pSize = $("input[name='pSize']").val();
    var pColor = $("input[name='pColor']").val();
    // Variables pour définir un id unique à chaque 'th'
    var pThid = 0;
    var pTrid = 0;
    // Variables du contenu des 'th'
    var pTh = '';
    var pThvalue = '';


    // Boucle d'initialisation de la grille
    while (pHid < pH) {
        while (pWid < pW) {
            pTh = '<th class="pPixel" id="pW' + pThid + pWid + '"></th>';
            pThvalue = pThvalue + pTh;
            pWid++;
        }
        $('#pTable').append('<tr id="pH' + pTrid + pHid + '">' + pThvalue + '</tr>');
        pWid = 0;
        pThvalue = '';
        pThid++;
        pHid++;
    }
    pWid = pW;
    // Fin de boucle

    // Fonctions en cas de changement de valeur des boutons
    $("input[name='pH']").change(function () {
        pHid = pH;
        pH = this.value;
    });

    $("input[name='pW']").change(function () {
        pWid = pW;
        pW = this.value;


    });

    $("input[name='pSize']").change(function () {
        pSize = this.value;
        $('.pPixel').css({"width": pSize + "px", "height": pSize + "px"});
    });

    $("input[name='pColor']").change(function () {
        pColor = this.value;

    });


});
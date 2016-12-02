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
    // Variables du contenu des 'th'
    var pTh = '';
    var pThvalue = '';


    // Fonction d'initialisation de la grille
    function addH() {
        while (pHid < pH) {
            while (pWid < pW) {
                pTh = '<td class="pPixel pColorX" id="pW' + 'id' + pWid + '"></td>';
                pThvalue = pThvalue + pTh;
                pWid++;
            }
            $('#pTableGrid').append('<tr id="pH' + pHid + '">' + pThvalue + '</tr>');
            pWid = 0;
            pThvalue = '';
            pHid++;
        }
        pWid = pW;
    }

    addH();
    // Fin de fonction
    pHid = pH;
    // Fonctions en cas de changement de valeur dd Hauteur de grille
    $("input[name='pH']").change(function () {
        if (this.value < 0) {
            this.attr('value', '1');
        }
        pH = this.value;
        if (pH < pHid) {
            while (pH < pHid) {
                $('#pTableGrid tr:last').remove();
                pHid--;
            }
        }
        if (pH > pHid) {
            while (pH > pHid) {
                pWid = 0;
                addH();
            }
        }
    });

    // Fonctions en cas de changement de valeur dd Largeur de grille
    $("input[name='pW']").change(function () {
        if (this.value < 0) {
            this.attr('value', '1');
        }
        pW = this.value;
        if (pW < pWid) {
            while (pW < pWid) {
                $('#pTableGrid tr td:last-child').remove();
                pWid--;
            }
        }
        if (pW > pWid) {
            while (pW > pWid) {

                $('#pTableGrid tr').append('<td class="pPixel pColorX" id="pW' + 'id' + pWid + '"></td>');
                pWid++;
            }
        }
    });

    // Fonction de changement de taille des cases
    $("input[name='pSize']").change(function () {
        pSize = this.value;
        $('.pPixel').css({"min-width": pSize + "px", "height": pSize + "px"});
    });

    // Fonctions changement de couleur
    $('#pTableColor td').click(function () {
        pColor = $(this).css("background-color");
    });

    $('#pColorX').click(function () {
        pColor = $(this).attr('class');
    });
    // Fonctions de couleurs personnelles
    $("input[name='pColor']").change(function () {
        pColor = this.value;
        $('#pPersoColor').append('<div class="pPersoColor" style="background:' + pColor + ';"></div>');
    });

    $(document).on('click', '.pPersoColor', function () {
        pColor = $(this).css("background-color");
    });

    // Fonction remise à zéro de la grille
    $("input[name='pReset']").click(function () {
        $('#pTableGrid td').addClass('pColorX').css("background", "").removeAttr('style');
    });

    // Fonction de coloration des cases
    $(document).on('click', '.pPixel', function () {
        if (pColor == 'pColorX') {
            $(this).removeAttr('style').addClass('pColorX');
        } else {
            $(this).removeClass('pColorX');
            $(this).css("background", pColor);
        }
    });

    // Fonctions de génération de code
    $(document).on('click', '#pBGenerate', function () {
        var tableG = $('#pSGrid').html();
        var text = $('#pHtmlGenerate').text(tableG);
        $(text).text(function (index, text) {
            return text
                .replace(/ id="\w*"/g, "")
                .replace(/ style="m\w*">/g, '>')
                .replace(/tr>/g, 'tr>\n')
                .replace(/<tr/g, '\t<tr')
                .replace(/td><td/g, 'td>\n<td')
                .replace(/<td/g, '\t\t<td')
                .replace(/td><\/tr/g, "td>\n</tr")
                .replace(/<\/tr/g, "\t</tr")
                .replace(/ pColorX"/g, '" style="background: rgb(0, 0, 0, 0); min-width: ' + pSize + 'px; height: ' + pSize + 'px;"')
                .replace(/ class="\w*"/g, "")
                .replace('table', 'table style="border: solid 0px; border-collapse: collapse;"')
                ;
        });
    });
});
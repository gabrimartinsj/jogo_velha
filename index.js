var rodada = 1;
var matriz = Array(3);

matriz['a'] = Array(3);
matriz['b'] = Array(3);
matriz['c'] = Array(3);

matriz['a'][1] = 0;
matriz['a'][2] = 0;
matriz['a'][3] = 0;
matriz['b'][1] = 0;
matriz['b'][2] = 0;
matriz['b'][3] = 0;
matriz['c'][1] = 0;
matriz['c'][2] = 0;
matriz['c'][3] = 0;

$(document).ready(function(){
    $('#btn_iniciar').click(function(){
        // Validação de entrada dos nicknames
        if ($('#enter_nick_jogador1').val() == ''){
            alert('Nick do jogador 1 não foi preenchido!')
            return false;
        }
        if ($('#enter_nick_jogador2').val() == ''){
            alert('Nick do jogador 2 não foi preenchido!')
            return false;
        }

        // Exibição dos nicknames
        $('#nick_jogador1').html($('#enter_nick_jogador1').val());
        $('#nick_jogador2').html($('#enter_nick_jogador2').val());

        // Controle de visualização das Divs
        $('#main').hide();
        $('#game').show();
    });

    $('.jogada').click(function(){
        var id_campo = this.id;
        $('#'+id_campo).off();
        jogada(id_campo);
    });

    function jogada(id){
        var icone = '';
        var ponto = 0;

        if ((rodada % 2) == 1){
            icone = 'url("imagens/marcacao_1.png")';
            ponto = -1;
        } else {
            icone = 'url("imagens/marcacao_2.png")';
            ponto = 1;
        }

        rodada++;

        $('#'+id).css('background-image', icone);

        var linha_coluna = id.split('');
        matriz[linha_coluna[0]][linha_coluna[1]] = ponto;

        verif_comb();
    }

    function verif_comb(){
        // Horizontal
        var pontos = 0;
        for (var i=1; i<=3; i++){
            pontos = pontos + matriz['a'][i];
        } vitoria(pontos);

        pontos = 0;
        for (var i=1; i<=3; i++){
            pontos = pontos + matriz['b'][i];
        } vitoria(pontos);

        pontos = 0;
        for (var i=1; i<=3; i++){
            pontos = pontos + matriz['c'][i];
        } vitoria(pontos);

        // Vertical
        for (var i=1; i<=3; i++){
            pontos = 0;
            pontos = pontos + matriz['a'][i] + matriz['b'][i] + matriz['c'][i];
            vitoria(pontos);
        }

        // Diagonal
        pontos = 0;
        pontos = pontos + matriz['a'][1] + matriz['b'][2] + matriz['c'][3];
        vitoria(pontos);

        pontos = 0;
        pontos = pontos + matriz['a'][3] + matriz['b'][2] + matriz['c'][1];
        vitoria(pontos);
    }

    function vitoria(pontos){
        if (pontos == -3){
            alert($('#enter_nick_jogador1').val()+' venceu!');
            $('.jogada').off();
        } else if (pontos == 3){
            alert($('#enter_nick_jogador2').val()+' venceu!');
            $('.jogada').off();
        }
    }
});

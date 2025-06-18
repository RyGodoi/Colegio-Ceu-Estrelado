$(document).ready(function() {

    // --- Funcionalidade do Navbar Mobile ---

    // Abrir o menu mobile
    $('#hamburger-icon').on('click', function() {
        $('#mobile-menu').addClass('open');
        $('body').addClass('no-scroll'); // Desabilita scroll da página

        // Adiciona e mostra o overlay
        if ($('.overlay').length === 0) { // Verifica se o overlay já existe
            $('body').append('<div class="overlay"></div>'); // Adiciona o overlay ao body
        }
        $('.overlay').fadeIn(300); // Mostra o overlay com um fade suave
    });

    // Fechar o menu mobile ao clicar no 'X' ou em um item do menu
    $('#close-mobile-menu, .mobile-nav-item').on('click', function() {
        $('#mobile-menu').removeClass('open');
        $('body').removeClass('no-scroll'); // Reabilita scroll da página

        // Esconde e remove o overlay
        $('.overlay').fadeOut(300, function() {
            $(this).remove(); // Remove o overlay do DOM após o fade out
        });
    });

    // Fechar o menu mobile ao clicar no overlay
    // Usamos $(document).on para lidar com elementos criados dinamicamente
    $(document).on('click', '.overlay', function() {
        $('#mobile-menu').removeClass('open');
        $('body').removeClass('no-scroll'); // Reabilita scroll da página

        // Esconde e remove o overlay
        $(this).fadeOut(300, function() {
            $(this).remove(); // Remove o overlay do DOM após o fade out
        });
    });


    // --- Funcionalidade do Lightbox de Galeria (mantida) ---

    // Abrir o lightbox ao clicar em qualquer imagem com a classe 'gallery-item'
    $('.gallery-item').on('click', function() {
        var imageUrl = $(this).attr('src'); // Pega o src da imagem clicada
        $('#lightbox-image').attr('src', imageUrl); // Define o src da imagem no lightbox
        $('#lightbox').addClass('active'); // Ativa o overlay do lightbox
        $('body').addClass('no-scroll'); // Desabilita scroll da página
    });

    // Fechar o lightbox ao clicar no 'X' ou no próprio overlay
    $('#close-lightbox, #lightbox').on('click', function(event) {
        // Verifica se o clique foi no overlay ou no 'X', mas não na imagem
        if (event.target.id === 'close-lightbox' || event.target.id === 'lightbox') {
            $('#lightbox').removeClass('active'); // Desativa o overlay do lightbox
            $('body').removeClass('no-scroll'); // Reabilita scroll da página
        }
    });

    // Impede que o clique na imagem dentro do lightbox feche o lightbox
    $('#lightbox-image').on('click', function(event) {
        event.stopPropagation(); // Impede que o evento de clique "suba" para o overlay
    });

});
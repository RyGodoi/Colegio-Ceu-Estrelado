$(document).ready(function () {

    // --- Funcionalidade do Navbar Mobile ---
    // Abrir o menu mobile
    $('#hamburger-icon').on('click', function () {
        $('#mobile-menu').addClass('open');
        $('body').addClass('no-scroll'); // Desabilita scroll da página
    });
    // Fechar o menu mobile ao clicar no 'X' ou em um item do menu
    $('#close-mobile-menu, .mobile-nav-item').on('click', function () {
        $('#mobile-menu').removeClass('open');
        $('body').removeClass('no-scroll'); // Reabilita scroll da página
    });



    // --- Funcionalidade da mini Galeria de imagens ---
    // Abrir o lightbox ao clicar em qualquer imagem com a classe 'gallery-item'
    $('.gallery-item').on('click', function () {
        var imageUrl = $(this).attr('src'); // Pega o src da imagem clicada
        $('#lightbox-image').attr('src', imageUrl); // Define o src da imagem no lightbox
        $('#lightbox').addClass('active'); // Ativa o overlay do lightbox
        $('body').addClass('no-scroll'); // Desabilita scroll da página
    });
    // Fechar o lightbox ao clicar no 'X' ou no próprio overlay
    $('#close-lightbox, #lightbox').on('click', function (event) {
        // Verifica se o clique foi no overlay ou no 'X', mas não na imagem
        if (event.target.id === 'close-lightbox' || event.target.id === 'lightbox') {
            $('#lightbox').removeClass('active'); // Desativa o overlay do lightbox
            $('body').removeClass('no-scroll'); // Reabilita scroll da página
        }
    });
    // Impede que o clique na imagem dentro do lightbox feche o lightbox
    $('#lightbox-image').on('click', function (event) {
        event.stopPropagation(); // Impede que o evento de clique "suba" para o overlay
    });



    //---Envio de Formulario com Framworks de terceiros Formspree
    // ---Parte do formulário ---
    $('.contato-form').submit(function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário (o redirecionamento)

        const $form = $(this);
        const url = $form.attr('action'); // Pega a URL do action do formulário
        const formData = $form.serialize(); // Pega todos os dados do formulário

        // Opcional: Desabilita o botão de enviar enquanto envia para evitar múltiplos cliques
        const $submitBtn = $form.find('button[type="submit"]');
        $submitBtn.prop('disabled', true).text('Enviando...');

        $.ajax({
            type: 'POST',
            url: url,
            data: formData,
            dataType: 'json', // O Formspree pode retornar JSON para requests AJAX
            success: function (response) {
                // Manipula a resposta de sucesso
                // console.log(response); // Para depuração

                $form.trigger('reset'); // Limpa os campos do formulário
                $submitBtn.prop('disabled', false).text('Mensagem Enviada!'); // Reabilita o botão

                // Exibe uma mensagem de sucesso (você precisaria de um elemento no HTML para isso)
                // Por exemplo, adicione <div id="form-messages"></div> no seu HTML
                // E depois: $('#form-messages').text('Sua mensagem foi enviada com sucesso!').css('color', 'green').fadeIn();
                alert('Sua mensagem foi enviada com sucesso!');

                // Opcional: Some com a mensagem de sucesso depois de alguns segundos
                // setTimeout(function() {
                //     $('#form-messages').fadeOut();
                // }, 5000);
            },
            error: function (xhr, status, error) {
                // Manipula erros
                // console.error(xhr.responseText); // Para depuração

                $submitBtn.prop('disabled', false).text('Enviar Mensagem'); // Reabilita o botão

                // Exibe uma mensagem de erro
                // $('#form-messages').text('Ocorreu um erro ao enviar sua mensagem. Tente novamente.').css('color', 'red').fadeIn();
                alert('Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
            }
        });
    });



    //---Animações da Pagina Home---
    const elementosParaAnimar = $('.elemento-animar');

    // Configurar as opções para o Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Quando 20% do elemento estiver visível
    };

    // A função que será executada quando a visibilidade dos elementos mudar
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // O elemento está visível na tela
                const $elemento = $(entry.target);

                // Remover a classe 'oculto' para que o elemento fique visível e pronto para animar
                $elemento.removeClass('oculto');

                // Obter o tipo de animação do atributo data-animar
                const tipoAnimacao = $elemento.data('animar');

                // Adicionar as classes do Animate.css
                // 'animate__animated' é a classe base que todas as animações precisam
                // 'animate__' + tipoAnimacao é a classe específica da animação (ex: animate__fadeInUp)
                $elemento.addClass('animate__animated animate__' + tipoAnimacao);

                // Opcional: Você pode adicionar uma classe para controlar a duração da animação (ex: animate__slow)
                // $elemento.addClass('animate__animated animate__' + tipoAnimacao + ' animate__slow');

                // Pare de observar este elemento para que a animação não se repita
                observer.unobserve(entry.target);
            }
        });
    };

    // Criar a instância do Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Começar a observar cada elemento
    elementosParaAnimar.each(function () {
        observer.observe(this);
    });
});
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
    // Abrir o lightbox ao clicar em qualquer imagem com a classe 'img-galeria'
    $('.img-galeria').on('click', function () {
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



    // --- Envio de Formulario com Frameworks de terceiros Formspree ---
    $('.contato-form').submit(function (event) {
        event.preventDefault();

        const $form = $(this);
        const url = $form.attr('action');
        const formData = $form.serialize();

        const $submitBtn = $form.find('button[type="submit"]');
        const $successAlert = $('#successAlert'); // Seleciona o alerta de sucesso
        const $errorAlert = $('#errorAlert');   // Seleciona o alerta de erro

        // Oculta quaisquer alertas visíveis antes de enviar
        $successAlert.addClass('d-none');
        $errorAlert.addClass('d-none');

        // Desabilita o botão e muda o texto
        $submitBtn.prop('disabled', true).text('Enviando...');

        $.ajax({
            type: 'POST',
            url: url,
            data: formData,
            dataType: 'json',
            success: function (response) {
                // Oculta o alerta de erro caso estivesse visível e exibe o de sucesso
                $errorAlert.addClass('d-none');
                $successAlert.removeClass('d-none'); // Torna o alerta de sucesso visível

                $form.trigger('reset'); // Limpa os campos do formulário
                $submitBtn.prop('disabled', false).text('Enviar Mensagem'); // Reabilita o botão

                // Faz o alerta de sucesso desaparecer após 5 segundos
                setTimeout(function () {
                    $successAlert.addClass('d-none');
                }, 5000);
            },
            error: function (xhr, status, error) {
                // Oculta o alerta de sucesso caso estivesse visível e exibe o de erro
                $successAlert.addClass('d-none');
                $errorAlert.removeClass('d-none'); // Torna o alerta de erro visível

                $submitBtn.prop('disabled', false).text('Enviar Mensagem'); // Reabilita o botão

                // Faz o alerta de erro desaparecer após 5 segundos
                setTimeout(function () {
                    $errorAlert.addClass('d-none');
                }, 5000);
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
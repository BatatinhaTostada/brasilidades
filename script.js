// Script para melhorar a acessibilidade
        document.addEventListener('DOMContentLoaded', function() {
            // Adicionar navegação hierárquica por títulos
            const headings = document.querySelectorAll('h1, h2, h3, h4');
            
            headings.forEach(heading => {
                heading.addEventListener('focus', function() {
                    // Anunciar o nível do título para leitores de tela
                    const level = this.tagName.charAt(1);
                    const text = this.textContent;
                    announceToScreenReader('Título nível ' + level + ': ' + text);
                });
            });
            
            // Adicionar leitura automática das descrições dos artistas
            const artistCards = document.querySelectorAll('.card[aria-describedby]');
            
            artistCards.forEach(card => {
                card.addEventListener('focus', function() {
                    const artistName = this.querySelector('h3').textContent;
                    const artistDesc = this.querySelector('p').textContent;
                    
                    // Pequeno delay para não sobrecarregar o leitor de tela
                    setTimeout(() => {
                        announceToScreenReader('Artista: ' + artistName + '. ' + artistDesc);
                    }, 500);
                });
            });
            
            // Adicionar leitura automática das obras
            const obraItems = document.querySelectorAll('.obra-item[aria-describedby]');
            
            obraItems.forEach(obra => {
                obra.addEventListener('focus', function() {
                    const obraTitle = this.querySelector('h5').textContent;
                    const obraDesc = this.querySelector('p').textContent;
                    
                    setTimeout(() => {
                        announceToScreenReader('Obra: ' + obraTitle + '. ' + obraDesc);
                    }, 500);
                });
            });
            
            // Adicionar funcionalidade aos botões de expandir
            const buttons = document.querySelectorAll('.btn[aria-expanded]');
            
            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    const expanded = this.getAttribute('aria-expanded') === 'true';
                    const targetId = this.getAttribute('aria-controls');
                    const target = document.getElementById(targetId);
                    
                    // Atualizar estado do botão
                    this.setAttribute('aria-expanded', !expanded);
                    
                    if (target) {
                        if (expanded) {
                            // Recolher conteúdo
                            target.classList.add('visually-hidden');
                            // Anunciar mudança para leitores de tela
                            announceToScreenReader('Descrições das obras recolhidas');
                        } else {
                            // Expandir conteúdo
                            target.classList.remove('visually-hidden');
                            // Anunciar mudança para leitores de tela
                            const artistName = this.closest('.card').querySelector('h3').textContent;
                            announceToScreenReader('Descrições das obras de ' + artistName + ' expandidas. Use Tab para navegar pelas informações das obras.');
                            
                            // Focar no primeiro título das obras
                            setTimeout(() => {
                                const firstHeading = target.querySelector('h4');
                                if (firstHeading) {
                                    firstHeading.focus();
                                }
                            }, 100);
                        }
                    }
                });
                
                // Permitir ativação com Enter ou Espaço
                button.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });
            
            // Adicionar navegação por teclado para cards
            const cards = document.querySelectorAll('.card[tabindex]');
            
            cards.forEach(card => {
                card.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        // Simular clique no botão dentro do card
                        const button = this.querySelector('.btn');
                        if (button) button.click();
                    }
                });
            });
            
            // Adicionar interação para itens da galeria
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                item.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        const altText = this.querySelector('img').getAttribute('alt');
                        announceToScreenReader('Imagem da galeria: ' + altText);
                    }
                });
            });
            
            // Função para anunciar mudanças para leitores de tela
            function announceToScreenReader(message) {
                const liveRegion = document.querySelector('[aria-live]');
                if (liveRegion) {
                    liveRegion.textContent = message;
                    setTimeout(() => {
                        liveRegion.textContent = '';
                    }, 4000);
                }
            }
            
            // Adicionar anúncio de carregamento para leitores de tela
            setTimeout(() => {
                announceToScreenReader('Página carregada completamente. Ao focar nos cartões dos artistas, o leitor de tela lerá automaticamente as descrições completas. Use Tab para navegar pela hierarquia de títulos e pelas obras dos artistas.');
            }, 1000);
        });
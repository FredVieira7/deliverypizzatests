/// <reference types="cypress"/>
require('cypress-xpath');

import { format } from '../support/utils';

context('Delivery Pizzas Testes', () => {

    beforeEach(( ) => {
        cy.visit('https://fredvieira7.github.io/deliverypizzas/');
    });

    it('Fazer um pedido', () => {
        cy.xpath('/html/body/main/div/div[2]/a/div[1]/img').click();
        cy.xpath('/html/body/div[2]/div/div[3]/div[2]/div[2]/div[2]').click();

        let quantidadePizza = 3;

        for(let i = 1; i < quantidadePizza; i++) {
            cy.get('button.pizzaInfo--qtmais').click();
        }

        cy.get('button.pizzaInfo--qtmenos').click();

        cy.get('div.pizzaInfo--addButton').click();
    });

    it('cancelar um pedido', () => {
        cy.xpath('/html/body/main/div/div[2]/a/div[1]/img').click();
        cy.xpath('/html/body/div[2]/div/div[3]/div[2]/div[2]/div[2]').click();

        let quantidadePizza = 3;

        for(let i = 1; i < quantidadePizza; i++) {
            cy.get('button.pizzaInfo--qtmais').click();
        }

        cy.get('button.pizzaInfo--qtmenos').click();

        cy.get('div.pizzaInfo--addButton').click();

        
        for(let j = 1; j < 3; j++) {
            cy.xpath('/html/body/aside/div/div[2]/div/div[2]/button[1]').click();
        }
    });

    it.only('Validar pedido', () => {
        cy.wait(2000);

        cy.xpath('/html/body/main/div/div[2]/a/div[1]/img').click();
        cy.xpath('/html/body/div[2]/div/div[3]/div[2]/div[2]/div[2]').click();

        cy.wait(2000);

        let quantidadePizza = 3
        for(let i = 1; i < quantidadePizza; i++) {
            cy.get('button.pizzaInfo--qtmais').click();
        }

        cy.get('div.pizzaInfo--addButton').click();

        cy.wait(2000);

        let subTotal = 0;
        let desconto = 0;
        
        cy.xpath('/html/body/aside/div').each(($elemento, index, $list) => {
            cy.get($elemento).find('.subtotal span').last().invoke('text').then(text => {
                if(text.includes('R$')) {
                    subTotal = subTotal + format(text);
                }
                cy.log(`Subtotal: ` + subTotal.toFixed(2));
                
            })
        })

        cy.xpath('/html/body/aside/div').each(($elemento, index, $list) => {
            cy.get($elemento).find('.desconto span').last().invoke('text').then(text => {
                if(text.includes('R$')) {
                    desconto = desconto + format(text);
                }
                cy.log(`Desconto: ` + desconto.toFixed(2));
                
            })
        })

        
        cy.get('.cart--totalitem span').last().invoke('text').then(text => {
            cy.log(`Valor total: ` + format(text).toFixed(2));

            let total = format(text);
            let valorTotalPizza = subTotal - desconto;

            expect(total).to.eq(valorTotalPizza);
        })
       
        
    });
})
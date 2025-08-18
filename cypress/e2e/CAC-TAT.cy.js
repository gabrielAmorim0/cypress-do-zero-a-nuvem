describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios', () => {
    const longText = Cypress._.repeat('tks!', 10)
    cy.get('#firstName').type('Gabi')
    cy.get('#lastName').type('Amorim')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })

    cy.contains('button', 'Enviar').click()
    // cy.get('.button[type=submit]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formaação inválida', () => {
    cy.get('#firstName').type('Gabi')
    cy.get('#lastName').type('Amorim')
    cy.get('#email').type('teste@gmail,com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar')

    // cy.get('.button[type=submit]').click()

    cy.get('.error').should('be.visible')
  })

  it('Campo telefone continua vazio quando preenchido com letras', () => {
    cy.get('#phone')
      .type('abcd')
      .should('have.value', '')
  })

  it('validar campos obrigatório telefone', () => {
    cy.get('#firstName').type('Gabi')
    cy.get('#lastName').type('Amorim')
    cy.get('#email').type('teste@gmail,com')
    cy.get('#open-text-area').type('teste')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    // cy.get('.button[type=submit]').click()

    cy.get('.error').should('be.visible')
  })


  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Gabi')
      .should('have.value', 'Gabi')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Amorim')
      .should('have.value', 'Amorim')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('teste@gmail.com')
      .should('have.value', 'teste@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('12345678')
      .should('have.value', '12345678')
      .clear()
      .should('have.value', '')

    cy.contains('button', 'Enviar').click()

  })

  it('envia o fórmulário com sucesso usando um comando customizado', () => {
    const data = {
      firstname: 'Gabi',
      lastName: 'Amorim',
      email: 'teste@gmail.com',
      openTextArea: 'teste'
    }

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (youtube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu texto por value', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu texto por indice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marcar o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marcar cata tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')

      })
  })

  it('marcar ambos checkboxs, deboi desmarcar o último ', () => {
    cy.get('input[type="checkbox"')
      .check()
      .should('be.checked')
    cy.get('input[type="checkbox"')
      .last()
      .uncheck()
      .should('be.not.checked')
  })

  it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress-do-zero-a-nuvem\cypress\fixtures\example.json')
      .should(input => {
        expect(input[0].file[0].name).to.equal('example.json')
      })
  })

  it('Drag and drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress-do-zero-a-nuvem\cypress\fixtures\example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].file[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture("example.json").as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].file[0].name).to.equal('example.json')
      })
  })

  it('Verificar que a politica de privacidade abre em outra aba sem a necessidade de um click', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessar a página de política de privacidade removento o target', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1','CAC TAT - Política de Privacidade')
    .should('be.visible')
  })


})

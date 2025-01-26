describe('End-to-End integration testing', () => {
    const baseUrl = 'http://127.0.0.1:8000'; // Base URL του backend
    const user = {
        username: 'testuser99',
        email: 'testuser99@gmail.com',
        pass: 'Password13#',
        firstName: 'Τεστ',
        lastName: 'Πελάτης',
        phoneNo: '6934567890',
    };
    const bookingDetails = {
        arrival: '2025-01-27',
        departure: '2025-01-28',
        capacity: 2,
        roomsNeeded: 1,
    };
    const paymentDetails = {
        cardNumber: '1111111111111111',
        cardName: 'TEST USER',
        expirationDate: '2025-12',
        cvc: '111',
    };
    const helpFormDetails = {
        firstName: "Τεστ",
        lastName: "Πελάτης",
        phoneNo: "6934567890",
        email: "testuser@gmail.com",
        message: "I need assistance with my reservation.",
    };

    // 1. Test για SignUp
    it('should sign up a new user', () => {
        cy.visit('/sign-up');
        cy.get('input[name="username"]').type(user.username);
        cy.get('input[name="email"]').type(user.email);
        cy.get('input[name="pass"]').type(user.pass);
        cy.get('input[name="firstName"]').type(user.firstName);
        cy.get('input[name="lastName"]').type(user.lastName);
        cy.get('input[name="phoneNo"]').type(user.phoneNo);
        cy.get('input[name="terms"]').check();
        cy.get('button[type="submit"]').click();

    });

    // 2. Test για Login
    it('should log in the user and redirect to BookNow page', () => {
        cy.visit('/login');
        cy.get('input[name="username"]').type(user.username);
        cy.get('input[name="password"]').type(user.pass);
        cy.get('button[type="submit"]').click();
    });

    // 3. Test για BookNow
    it('should allow the user to check room availability and make a reservation', () => {
        cy.visit('/book-now');
        cy.get('input[name="arrival"]').type(bookingDetails.arrival);
        cy.get('input[name="departure"]').type(bookingDetails.departure);
        cy.get('select[name="rooms"]').select('1').invoke('val').should('eq', '1');
        cy.get('select[name="guests"]').select('2').invoke('val').should('eq', '2');
        cy.get('button[name="Submit1"]').click();

        cy.get('input[name="username"]').type(user.username);
        cy.get('input[name="password"]').type(user.pass);
        cy.get('button[name="Submit2"]').click();
    });

    // 4. Test για Payment
    it('should process a payment successfully', () => {
        cy.visit('/payment');
        cy.get('input[name="creditNumber"]').type(paymentDetails.cardNumber);
        cy.get('input[name="creditName"]').type(paymentDetails.cardName);
        cy.get('input[name="expiryDate"]').type(paymentDetails.expirationDate);
        cy.get('input[name="cvv"]').type(paymentDetails.cvc);
        cy.get('button[type="submit"]').click();
    });

    // 5. Έλεγχος Routing στις σελίδες about-us και rooms
    it('should navigate to the About Us page and display its content', () => {
        cy.visit('/about-us');
        cy.contains('About Us').should('be.visible'); // Επαλήθευση ότι η σελίδα φορτώθηκε σωστά
    });

    it('should navigate to the Rooms page and display its content', () => {
        cy.visit('/rooms');
        cy.contains('Rooms').should('be.visible'); // Επαλήθευση ότι η σελίδα φορτώθηκε σωστά
    });

    // 6. Test για τη φόρμα Need Help
    it('should send a help request successfully', () => {
        cy.visit('/need-help');
        cy.get('input[name="firstName"]').type(helpFormDetails.firstName);
        cy.get('input[name="lastName"]').type(helpFormDetails.lastName);
        cy.get('input[name="phoneNo"]').type(helpFormDetails.phoneNo);
        cy.get('input[name="email"]').type(helpFormDetails.email);
        cy.get('textarea[name="message"]').type(helpFormDetails.message);
        cy.get('button[type="submit"]').click();
    });
});

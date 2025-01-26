describe('Frontend Negative End-to-End Tests', () => {
    const baseUrl = 'http://127.0.0.1:8000'; // Base URL του backend

    const invalidUser1 = {
        username: 'wronguser1',
        email: 'invalidemail', // Λανθασμένο email
        pass: 'Password1#',
        firstName: 'Τεστ',
        lastName: 'Πελάτης',
        phoneNo: '1234567890',
    };

    const invalidUser2 = {
        username: 'wronguser2',
        email: 'testuser2@gmail.com',
        pass: 'Password2#',
        firstName: 'Τεστ',
        lastName: 'Πελάτης',
        phoneNo: 'ABCDE', // Λανθασμένος αριθμός τηλεφώνου
    };

    const invalidUser3 = {
        username: 'wronguser3',
        email: 'testuser3@gmail.com',
        pass: 'wrong', // Λανθασμένο password
        firstName: 'Τεστ',
        lastName: 'Πελάτης',
        phoneNo: '1234567890',
    };

    // valid user
    const user = {
        username: 'testuser99',
        pass: 'Password13#',
    };

    const invalidBookingDetails1 = {
        arrival: '', // Λείπει η ημερομηνία άφιξης
        departure: '2025-01-29',
        capacity: 3,
        roomsNeeded: 1,
    };

    const invalidBookingDetails2 = {
        arrival: '2025-01-29', // arrival>departure
        departure: '2025-01-28',
        capacity: 3,
        roomsNeeded: 1,
    };

    const invalidPaymentDetails1 = {
        cardNumber: '1234567890123456111', // Αριθμός κάρτας που δεν είναι έγκυρος
        cardName: 'TEST PELATIS',
        expirationDate: '1226',
        cvc: '567',
    };

    const invalidPaymentDetails2 = {
        cardNumber: '1234123412341234',
        cardName: 'TEST PELATIS',
        expirationDate: '1226',
        cvc: '12', // Λανθασμένο CVV
    };

    const invalidPaymentDetails3 = {
        cardNumber: '1234567890123456111',
        cardName: 'ΤΕΣΤ ΠΕΛΑΤΗΣ', // Το όνομα πρέπει να είναι γραμμένο στα αγγλικά
        expirationDate: '1226',
        cvc: '567',
    };


    // 1. Tests για SignUp με διάφορα μη έγκυρα δεδομένα
    describe('SignUp Negative Tests', () => {
        it('should not allow signup with invalid email', () => {
            cy.visit('/sign-up');
            cy.get('input[name="username"]').type(invalidUser1.username);
            cy.get('input[name="email"]').type(invalidUser1.email); // Λανθασμένο email
            cy.get('input[name="pass"]').type(invalidUser1.pass);
            cy.get('input[name="firstName"]').type(invalidUser1.firstName);
            cy.get('input[name="lastName"]').type(invalidUser1.lastName);
            cy.get('input[name="phoneNo"]').type(invalidUser1.phoneNo);
            cy.get('input[name="terms"]').check();
            cy.get('button[type="submit"]').click();

            cy.contains('Invalid email format.').should('be.visible');
        });

        it('should not allow signup with invalid phone number', () => {
            cy.visit('/sign-up');
            cy.get('input[name="username"]').type(invalidUser2.username);
            cy.get('input[name="email"]').type(invalidUser2.email);
            cy.get('input[name="pass"]').type(invalidUser2.pass);
            cy.get('input[name="firstName"]').type(invalidUser2.firstName);
            cy.get('input[name="lastName"]').type(invalidUser2.lastName);
            cy.get('input[name="phoneNo"]').type(invalidUser2.phoneNo); // Λανθασμένος αριθμός τηλεφώνου
            cy.get('input[name="terms"]').check();
            cy.get('button[type="submit"]').click();

            cy.contains('Invalid phone number.').should('be.visible');
        });

        it('should not allow signup with short password', () => {
            cy.visit('/sign-up');
            cy.get('input[name="username"]').type(invalidUser3.username);
            cy.get('input[name="email"]').type(invalidUser3.email);
            cy.get('input[name="pass"]').type(invalidUser3.pass); // Σύντομο password
            cy.get('input[name="firstName"]').type(invalidUser3.firstName);
            cy.get('input[name="lastName"]').type(invalidUser3.lastName);
            cy.get('input[name="phoneNo"]').type(invalidUser3.phoneNo);
            cy.get('input[name="terms"]').check();
            cy.get('button[type="submit"]').click();

            cy.contains('Password must be at least 8 characters long.').should('be.visible');
        });
    });

    // 2. Test για Login με λάθος στοιχεία(Δεν υπάρχει ο χρήστης:Επιτυχημένη εμφάνιση του μηνύματος λάθους)
    describe('Login Negative Tests(Δεν υπάρχει ο χρήστης:Επιτυχημένη εμφάνιση του μηνύματος λάθους)', () => {
        it('should not allow login with invalid credentials', () => {
            cy.visit('/login');
            cy.get('input[name="username"]').type(invalidUser1.username);
            cy.get('input[name="password"]').type(invalidUser1.pass);
            cy.get('button[type="submit"]').click();

            // Επαλήθευση
            cy.contains('Invalid credentials. Please try again.').should('be.visible');
        });
    });

    // 3. Tests για Booking με διάφορα μη έγκυρα δεδομένα
    describe('Booking Negative Tests', () => {
        it('should not allow booking with missing arrival date', () => {
            cy.visit('/book-now');
            cy.get('input[name="arrival"]').type(invalidBookingDetails1.arrival); // Κενή ημερομηνία άφιξης
            cy.get('input[name="departure"]').type(invalidBookingDetails1.departure);
            cy.get('select[name="rooms"]').select('1').invoke('val').should('eq', '1');
            cy.get('select[name="guests"]').select('3').invoke('val').should('eq', '3');
            cy.get('button[name="Submit1"]').click();

            // valid user
            cy.get('input[name="username"]').type(user.username);
            cy.get('input[name="password"]').type(user.pass);
            cy.get('button[name="Submit2"]').click();

            cy.contains('Arrival date is required.').should('be.visible');
        });

        it('should not allow booking with arrival date after departure date', () => {
            cy.visit('/book-now');
            cy.get('input[name="arrival"]').type(invalidBookingDetails2.arrival); // arrival > departure
            cy.get('input[name="departure"]').type(invalidBookingDetails2.departure);
            cy.get('select[name="rooms"]').select('1').invoke('val').should('eq', '1');
            cy.get('select[name="guests"]').select('3').invoke('val').should('eq', '3');
            cy.get('button[name="Submit1"]').click();

            // valid user
            cy.get('input[name="username"]').type(user.username);
            cy.get('input[name="password"]').type(user.pass);
            cy.get('button[name="Submit2"]').click();

            cy.contains('Arrival date cannot be after departure date.').should('be.visible');
        });
    });

    // 4. Tests για Payment με διάφορα μη έγκυρα δεδομένα
    describe('Payment Negative Tests', () => {
        it('should not process payment with invalid card number', () => {
            cy.visit('/payment');
            cy.get('input[name="creditNumber"]').type(invalidPaymentDetails1.cardNumber); // Μη έγκυρος αριθμός κάρτας
            cy.get('input[name="creditName"]').type(invalidPaymentDetails1.cardName);
            cy.get('input[name="expiryDate"]').type(invalidPaymentDetails1.expirationDate);
            cy.get('input[name="cvv"]').type(invalidPaymentDetails1.cvc);
            cy.get('button[type="submit"]').click();

            cy.contains('Invalid card number.').should('be.visible');
        });

        it('should not process payment with invalid CVV', () => {
            cy.visit('/payment');
            cy.get('input[name="creditNumber"]').type(invalidPaymentDetails2.cardNumber);
            cy.get('input[name="creditName"]').type(invalidPaymentDetails2.cardName);
            cy.get('input[name="expiryDate"]').type(invalidPaymentDetails2.expirationDate);
            cy.get('input[name="cvv"]').type(invalidPaymentDetails2.cvc); // Λανθασμένο CVV
            cy.get('button[type="submit"]').click();

            cy.contains('Invalid CVV.').should('be.visible');
        });

        it('should not process payment with card name in non-English characters', () => {
            cy.visit('/payment');
            cy.get('input[name="creditNumber"]').type(invalidPaymentDetails3.cardNumber);
            cy.get('input[name="creditName"]').type(invalidPaymentDetails3.cardName); // Μη αγγλικοί χαρακτήρες στο όνομα
            cy.get('input[name="expiryDate"]').type(invalidPaymentDetails3.expirationDate);
            cy.get('input[name="cvv"]').type(invalidPaymentDetails3.cvc);
            cy.get('button[type="submit"]').click();

            cy.contains('Cardholder name must be in English.').should('be.visible');
        });
    });
});
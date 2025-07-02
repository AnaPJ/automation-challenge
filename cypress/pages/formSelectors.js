export const FORM_SELECTORS = {
    // Signup form selectors
    FORM: 'form.mx-auto',
    FULL_NAME_INPUT: 'input[name="name"]',
    EMAIL_INPUT: 'input[name="email"]',
    PASSWORD_INPUT: 'input[name="password"]',
    CONFIRM_PASSWORD_INPUT: 'input[name="repeatPassword"]',
    SUBMIT_SIGNUP_BUTTON: 'button[data-at="submit-signup"]',
    ERROR_MESSAGE: '.text-red-500',
    
    // Login form selectors
    SUBMIT_LOGIN_BUTTON: 'button[data-at="submit-login"]',
    MODAL:'div[aria-describedby="swal2-html-container"]',
    MODAL_TITLE: '#swal2-title',
    MODAL_TEXT: '#swal2-html-container',
    MODAL_VOLVER_BUTTON: '.swal2-confirm'
}
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';

document.querySelector('.btn-login').onclick = () => {
  basicLightbox
    .create(
      `
      <form class="login-block">
      <input
        class="login-block__user-name"
        type="text"
        placeholder="Enter your name..."
      />
      <input
        class="login-block__password"
        type="password"
        placeholder="Enter your password..."
      />
      <div class="login-block__btn-block">
        <button class="login-block__log-in btn-default">Log in</button>
        <button class="login-block__registration btn-default">
          Registration
        </button>
      </div>
    </form>
	`,
    )
    .show();
};

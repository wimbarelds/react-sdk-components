import React from 'react';
import { getHomeUrl, authIsMainRedirect, authRedirectCallback } from "../../helpers/authManager";
import { authDone } from "@pega/auth/oauth-client/authDone";


export default function AuthPage() {

  if( authIsMainRedirect() ) {

    authRedirectCallback(window.location.href, () => {
      // eslint-disable-next-line no-restricted-globals
      location.href = `${getHomeUrl()}portal`;
    });
  } else {
    authDone();
  }

  return (
    <div />
  );
}

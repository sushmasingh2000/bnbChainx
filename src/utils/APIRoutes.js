// export const domain = 'http://192.168.18.214:9033';
export const domain = 'https://backend.fastro.info';
export const frontend = 'https://buybot.club';
export const dollar = "$"

export const endpoint = {
  registration_api: `${domain}/api/v1/auth-registration`,
  login_api: `${domain}/api/v4/user-login`,
  dashboard_data: `${domain}/api/v1/user-dashboard`,
  profile_api: `${domain}/api/v1/user-details`,
  roi_income_api: `${domain}/api/v1/user-income-report`,
  admin_roi_income_api: `${domain}/api/v1/admin-income-report`,
  admin_dashboard: `${domain}/api/v1/admin-dashboard`,
  admin_fund_memeber: `${domain}/api/v1/admin-fund-member-topup`,
  topup_report: `${domain}/api/v1/topup-report`,
  admin_topup_report: `${domain}/api/v1/admin-topup-report`,
  user_details: `${domain}/api/v1/user-invester-details`,
  admin_user_details: `${domain}/api/v1/admin-invester-details`,
  customer_api: `${domain}/api/v1/get-user-name-by-customer-id`,
  add_wallet_address: `${domain}/api/v1/add-user-wallet-address`,
  update_user_password: `${domain}/api/v1/update-user-password`,
  add_user_withdrawal: `${domain}/api/v1/user-withdrawal-request`,
  withdrawal_list: `${domain}/api/v1/withdrawal-report`,
  admin_withdrawal_list: `${domain}/api/v1/admin-withdrawal-report`,
  withdrawal_request: `${domain}/api/v1/withdrawal-request-approval`,
  admin_upload_qr: `${domain}/api/v1/admin-upload-qr`,
  get_admin_upload_qr: `${domain}/api/v1/get-admin-upload-qr`,
  get_user_upload_qr: `${domain}/api/v1/get-user-upload-qr`,
  add_user_fund_request: `${domain}/api/v1/add-user-fund-request`,
  get_user_fund_request: `${domain}/api/v1/get-user-fund-request`,
  admin_paying_report: `${domain}/api/v1/get-admin-fund-request`,
  change_status_fund: `${domain}/api/v1/change-fund-request_admin`,
  direct_referral_user: `${domain}/api/v1/user-direct-referral-details`,
  team_downline_user: `${domain}/api/v1/user-team-downline-details`,
  team_downline_user_filterwise: `${domain}/api/v1/user-team-downline-details-filterwise`,
  update_user_profile: `${domain}/api/v1/user-update-profile`,
  forgot_email: `${domain}/api/v1/password-on-mail`,













  wallet_api: `${domain}/api/v1/check-wallet-address-availability`,
  package_list_api: `${domain}/api/v1/get-package-details`,
  paying_dummy_api: `${domain}/api/v1/activation-dummy-request`,
  paying_api: `${domain}/api/v1/activation-request`,
  general_contact_address_api: `${domain}/api/v1/get-api-general-data`,
  withdrawal_api: `${domain}/api/v1/withdrawal-req`,
  withdrawal_history_api: `${domain}/api/v1/get-withdrawal-details`,
  change_password_api: `${domain}/api/v1/change-password`,
  user_dashboard_api: `${domain}/api/v1/user-dashboard-data`,
  get_topup_api: `${domain}/api/v1/get-topup-details`,
  topup_api: `${domain}/api/v1/admin-topup-id`,
  market_api: `${domain}/api/v3/simple/price`,
  team_data_api: `${domain}/api/v1/get-team-data`,
  team_data_level_api: `${domain}/api/v1/get-team-data?`,
  tree_data: `${domain}/api/v1/get-downline-team`,
};

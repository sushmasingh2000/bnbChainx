import { API_URLS } from "../config/APIUrls";
import axiosInstance from "../config/axios";


export const getCoupon = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.coupon,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const getCompany = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.comapany_promoter_list,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const registrationCahrt = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.registration_chart,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const businessChart = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.business_chart,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const trxChart = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.trx_chart,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const wingoChart = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.wingo_chart,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const aviatorChart = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.avaitor_chart,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const getUserList = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.user_list,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const candidateName = async (reqBody) => {
  console.log(reqBody);
  try {
    const res = await axiosInstance.get(
      API_URLS?.get_name_code,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const getWelcomeBonus = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.welcome_bonus,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const getDepositBonus = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.deposit_bonus_data,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const getSelfDepositBonus = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.self_deposit_bonus_data,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const getRoiBonus = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.roi_bonus_data,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const getDailySalaryBonus = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.daily_salary_bonus_data,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const getgiftBonus = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.gift_bonus_data,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const getbetBonus = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.bet_bonus_data,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const getUplineTeam = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.up_team,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const getDownlineTeam = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.down_team,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const getlevelBonus = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.level_bonus_data,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
//

export const dashboard_counter_function = async () => {
  try {
    const res = axiosInstance.get(API_URLS?.dashboard_counter);
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const get_username_by_referralidFunctoin = async (reqBody) => {
  try {
    const res = await axiosInstance.get(API_URLS.get_username_by_referralid, {
      params: reqBody,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const get_all_player_data = async () => {
  try {
    const res = axiosInstance.get(API_URLS?.get_all_player);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const get_next_id_one_min = async (reqBody) => {
  try {
    const res = axiosInstance.get(API_URLS?.get_next_gameid_one_min,{
      params:reqBody
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const getSubadminList = async () => {
  try {
    const res = await axiosInstance.get(API_URLS?.get_sub_admin_list);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const getdownlinebyid = async (reqBody) => {
  try {
    const res = await axiosInstance.get(
      API_URLS?.get_downline_data_by_id,
      {
        params: reqBody,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const getViewAssignedMenuList = async () => {
  try {
    const res = await axiosInstance.get(API_URLS?.get_new_assigned_menu_list);
    return res;
  } catch (e) {
    console.log(e);
  }
};

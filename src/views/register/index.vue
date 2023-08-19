<template>
  <div :class="[
      'login-wrapper',
      ['', 'login-form-right', 'login-form-left'][direction]
    ]">
    <a-form ref="formRef" :model="form" :rules="rules" class="login-form ele-bg-white" :label-col="labelCol" :wrapper-col="wrapperCol">
      <h4>用户注册</h4>
      <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '字母和数字的组合,不少于5位' }]">
        <a-input v-model:value="form.username" placeholder="字母和数字的组合，不少于5位" @keyup.enter="submit"></a-input>
      </a-form-item>
      <a-form-item label="邀请码" name="inviteCode" :rules="[{ required: true, message: '请输入邀请码' }]">
        <a-input v-model:value="form.inviteCode" placeholder="请输入邀请码" @keyup.enter="submit"></a-input>
      </a-form-item>
      <a-form-item label="密码" name="password" :rules="[{ required: true, message: '密码是字母/数字且不少于5位' }]">
        <a-input-password size="large" v-model:value="form.password" :placeholder="t('login.password')" @keyup.enter="submit"></a-input-password>
      </a-form-item>
      <a-form-item label="确认密码" name="username" :rules="[{ required: true, message: '请再一次输入密码' }]">
        <a-input-password size="large" v-model:value="passwordagain" :placeholder="t('login.password')" @keyup.enter="submit"></a-input-password>
      </a-form-item>
      <a-form-item label="验证码" name="verifyCode" :rules="[{ required: true, message: '请输入验证码' }]">
        <div class="login-input-group">
          <a-input allow-clear size="large" v-model:value="form.verifyCode" :placeholder="t('login.code')" @keyup.enter="submit"></a-input>
          <a-button class="login-captcha" @click="changeCaptcha">
            <img v-if="captcha" :src="captcha" alt />
          </a-button>
        </div>
      </a-form-item>
      <a-form-item>
        <router-link to="/login" class="ele-pull-right" style="line-height: 22px">使用已有账号登录</router-link>
      </a-form-item>
      <a-form-item>
        <a-button block size="large" type="primary" :loading="loading" @click="submit">{{ loading ? t('login.loading') : t('login.login') }}</a-button>
      </a-form-item>
    </a-form>
    <!-- <div class="login-copyright">
      copyright © 2022 eleadmin.com all rights reserved.
    </div>-->
    <!-- 多语言切换 -->
    <!-- <div style="position: absolute; right: 30px; top: 20px; z-index: 999">
      <i18n-icon placement="bottomLeft" :style="{ fontSize: '18px', color: '#fff' }" />
    </div>-->
  </div>
</template>

<script setup>
import { ref, reactive, computed, unref, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue/es';
import {
  UserOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  QqOutlined,
  WechatOutlined,
  WeiboOutlined
} from '@ant-design/icons-vue';
import I18nIcon from '@/layout/components/i18n-icon.vue';
import { getToken } from '@/utils/token-util';
import { goHomeRoute, cleanPageTabs } from '@/utils/page-tab-util';
import { register, getCaptcha } from '@/api/login';

const { currentRoute } = useRouter();
const { t } = useI18n();

// 登录框方向, 0 居中, 1 居右, 2 居左
const direction = ref(0);

//
const formRef = ref(null);

// 加载状态
const loading = ref(false);

// 表单数据
const form = reactive({
  username: '',
  inviteCode: '',
  password: '',
  verifyCode: '',
  verifyCodeKey: ''
});

// 验证码 base64 数据
const captcha = ref('');

// 验证码内容, 实际项目去掉
const text = ref('');

const labelCol = computed(() => {
  return {
    style: {
      width: '100px'
    }
  };
});

const wrapperCol = computed(() => {
  return {
    // span: 16
  };
});

/* 跳转到首页 */
const goHome = () => {
  const { query } = unref(currentRoute);
  goHomeRoute(query.from);
};

/* 提交 */
const submit = () => {
  if (!formRef.value) {
    return;
  }
  formRef.value.validate().then(() => {
    // if (form.code.toLowerCase() !== text.value) {
    //   message.error('验证码错误');
    //   return;
    // }
    loading.value = true;
    register(form)
      .then((msg) => {
        message.success(msg);
        // cleanPageTabs();
        goHome();

        // goHomeRoute('/home/frontpage');
        // window.location.reload();
      })
      .catch((e) => {
        message.error(e.response.data.msg);
        if (e.response.data.code == 1002 || e.response.data.code == 1003) {
          changeCaptcha();
        }
        loading.value = false;
      });
  });
};

/* 获取图形验证码 */
const changeCaptcha = () => {
  getCaptcha()
    .then((data) => {
      captcha.value = 'data:image/png;base64,' + data.verifyCode;
      form.verifyCodeKey = data.verifyCodeKey;
      formRef.value?.clearValidate();
    })
    .catch((e) => {
      message.error(e.msg);
    });
};

if (getToken()) {
  goHome();
} else {
  changeCaptcha();
}
</script>

<style lang="less" scoped>
/* 背景 */
.login-wrapper {
  padding: 48px 16px 0 16px;
  position: relative;
  box-sizing: border-box;
  background-image: url('@/assets/bg-login.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
  }
}

/* 卡片 */
.login-form {
  width: 460px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 28px;
  box-sizing: border-box;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  position: relative;
  z-index: 2;

  h4 {
    padding: 22px 0;
    text-align: center;
  }
}

.login-form-right .login-form {
  margin: 0 15% 0 auto;
}

.login-form-left .login-form {
  margin: 0 auto 0 15%;
}

/* 验证码 */
.login-input-group {
  display: flex;
  align-items: center;

  :deep(.ant-input-affix-wrapper) {
    flex: 1;
  }

  .login-captcha {
    width: 102px;
    height: 40px;
    margin-left: 10px;
    padding: 0;

    & > img {
      width: 100%;
      height: 100%;
    }
  }
}

/* 第三方登录图标 */
.login-oauth-icon {
  color: #fff;
  padding: 5px;
  margin: 0 12px;
  font-size: 18px;
  border-radius: 50%;
  cursor: pointer;
}

/* 底部版权 */
.login-copyright {
  color: #eee;
  text-align: center;
  padding: 48px 0 22px 0;
  position: relative;
  z-index: 1;
}

/* 响应式 */
@media screen and (min-height: 640px) {
  .login-wrapper {
    padding-top: 0;
  }

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: -230px;
  }

  .login-form-right .login-form,
  .login-form-left .login-form {
    left: auto;
    right: 15%;
    transform: translateX(0);
    margin: -230px auto auto auto;
  }

  .login-form-left .login-form {
    right: auto;
    left: 15%;
  }

  .login-copyright {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

@media screen and (max-width: 768px) {
  .login-form-right .login-form,
  .login-form-left .login-form {
    left: 50%;
    right: auto;
    margin-left: 0;
    margin-right: auto;
    transform: translateX(-50%);
  }
}
</style>

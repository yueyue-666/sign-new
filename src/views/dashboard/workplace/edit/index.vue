<template>
  <div class="ele-body ele-body-card">
    <a-row :gutter="16" style="column-gap: 10px;">
      <a-col :xxl="6" :xl="7" :lg="9" :md="24" :sm="24" :xs="24" class="cloumn-class">
        <a-card :bordered="false">
          <div class="user-info-list" style="margin-top:0;">
            <div class="ele-text-center">
              <div class="user-info-avatar-group" @click="openCropper">
                <a-avatar :size="70" :src="AppInfo.icon" shape="square" />
                <upload-outlined class="user-info-avatar-icon" />
              </div>
            </div>
            <div class="ele-cell">
              <edit-outlined />
              <div class="ele-cell-content">
                <a @click="visible1 = true" style="cursor:pointer;">备注</a>
              </div>
            </div>
            <div class="ele-cell">
              <tag-outlined />
              <div class="ele-cell-content">
                <span>{{ AppInfo.name }}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                <ele-tag size="mini" shape="round" color="red" v-if="AppInfo.signType === 1">V3</ele-tag>
                <ele-tag size="mini" shape="round" color="red" v-else-if="AppInfo.signType === 2">混合</ele-tag>
                <ele-tag size="mini" shape="round" color="red" v-else>V2</ele-tag>
              </div>
            </div>
            <div class="ele-cell">
              <tag-outlined />
              <div class="ele-cell-content">大小：{{ getfilesize(AppInfo.size) }}</div>
            </div>
            <div class="ele-cell">
              <tag-outlined />
              <div class="ele-cell-content">版本：{{ AppInfo.version }}</div>
            </div>
            <div class="ele-cell">
              <tag-outlined />
              <div class="ele-cell-content">Bundle ID：{{ AppInfo.bundleId }}</div>
            </div>
          </div>
          <a-divider dashed />
          <a-card :bordered="false" :body-style="{ padding: '2px 0px' }">
            <div class="ele-cell-content">
              <div class="ele-text-secondary ele-cell">
                <p class="ele-cell-content">
                  下载地址
                  <a-tag color="green" @click="copyDetail(AppInfo.iosDownloadUrl)" style="cursor:pointer;">复制</a-tag>
                </p>
                <span style="margin-bottom:1em;">
                  <a-tooltip>
                    <template #title>
                      <ele-qr-code-svg :value="AppInfo.iosDownloadUrl" :size="82" />
                      <br />手机扫码下载
                    </template>
                    <qrcode-outlined />
                  </a-tooltip>
                </span>
              </div>
              <a :href="AppInfo.iosDownloadUrl" target="_blank" rel="noopener noreferrer">{{ AppInfo.iosDownloadUrl }}</a>
            </div>
            <a-divider style="margin:10px 0;" dashed />
            <div class="ele-cell-content">
              <div class="ele-text-secondary ele-cell">
                <p class="ele-cell-content">
                  备用地址
                  <a-tag color="green" @click="copyDetail(AppInfo.backupUrl)" style="cursor:pointer;">复制</a-tag>
                </p>
                <span style="margin-bottom:1em;">
                  <a-tooltip>
                    <template #title>
                      <ele-qr-code-svg :value="AppInfo.backupUrl" :size="82" />
                      <br />手机扫码下载
                    </template>
                    <qrcode-outlined />
                  </a-tooltip>
                </span>
              </div>
              <a :href="AppInfo.backupUrl" target="_blank" rel="noopener noreferrer">{{ AppInfo.backupUrl }}</a>
            </div>
          </a-card>
          <a-divider style="margin:10px 0;" dashed />
          <div>
            <!-- <div class="demo-monitor-title">门店销售额排名</div> -->
            <div class="demo-monitor-rank-item ele-cell">
              <ele-tag shape="circle" :color="''" style="border: none">1</ele-tag>
              <div class="ele-cell-content ele-elip">今日iOS消耗量</div>
              <div class="ele-text-secondary">{{ UserData.iosTodayUsed }}</div>
            </div>
            <a-divider style="margin:10px 0;" dashed />
            <div class="demo-monitor-rank-item ele-cell">
              <ele-tag shape="circle" :color="''" style="border: none">2</ele-tag>
              <div class="ele-cell-content ele-elip">昨日iOS消耗量</div>
              <div class="ele-text-secondary">{{ UserData.iosLastDayUsed }}</div>
            </div>
            <a-divider style="margin:10px 0;" dashed />
            <div class="demo-monitor-rank-item ele-cell">
              <ele-tag shape="circle" :color="''" style="border: none">3</ele-tag>
              <div class="ele-cell-content ele-elip">iOS累计消耗量</div>
              <div class="ele-text-secondary">{{ UserData.iosTotalUsed }}</div>
            </div>
            <a-divider style="margin:10px 0;" dashed />
            <div class="demo-monitor-rank-item ele-cell">
              <ele-tag shape="circle" :color="''" style="border: none">4</ele-tag>
              <div class="ele-cell-content ele-elip">今日Android下载量</div>
              <div class="ele-text-secondary">{{ UserData.androidTodayUsed }}</div>
            </div>
            <a-divider style="margin:10px 0;" dashed />
            <div class="demo-monitor-rank-item ele-cell">
              <ele-tag shape="circle" :color="''" style="border: none">5</ele-tag>
              <div class="ele-cell-content ele-elip">昨日Android下载量</div>
              <div class="ele-text-secondary">{{ UserData.androidLastDayUsed }}</div>
            </div>
            <a-divider style="margin:10px 0;" dashed />
            <div class="demo-monitor-rank-item ele-cell">
              <ele-tag shape="circle" :color="''" style="border: none">6</ele-tag>
              <div class="ele-cell-content ele-elip">Android累计下载量</div>
              <div class="ele-text-secondary">{{ UserData.androidTotalUsed }}</div>
            </div>
          </div>
          <a-divider style="margin:10px 0;" dashed />
          <div class="btns-class">
            <a-button type="primary" :danger="AppInfo.appStatus === 1" @click="editStatus(AppInfo.appStatus)">
              {{
              AppInfo.appStatus === 1 ? '下架' : '上架' }}
            </a-button>
            <a-button type="primary" @click="updateApp(isAdmin ? '更新源包' : '更新应用')">{{ isAdmin ? '更新源包' : '更新' }}</a-button>
            <a-button type="primary" @click="updateApp('更新已重签包')" v-if="isAdmin">更新已重签包</a-button>
            <a-button @click="onClose">关闭</a-button>
          </div>
        </a-card>
      </a-col>
      <a-col :xxl="17" :xl="16" :lg="14" :md="24" :sm="24" :xs="24" class="cloumn-class">
        <a-card :bordered="false" :body-style="{ paddingTop: '0px', minHeight: '600px' }">
          <a-tabs v-model:activeKey="active" size="large">
            <a-tab-pane tab="基础设置" key="info">
              <a-spin :spinning="loading">
                <a-form
                  ref="formRef"
                  :model="form"
                  :rules="rules"
                  :label-col="{ lg: 4, md: 6, sm: 4, xs: 24 }"
                  :wrapper-col="{ lg: 20, md: 18, sm: 20, xs: 24 }"
                  style="max-width: 580px; margin-top: 20px"
                >
                  <!-- <a-form-item label="昵称" name="nickname">
                <a-input v-model:value="form.nickname" placeholder="请输入昵称" allow-clear />
              </a-form-item>
              <a-form-item label="邮箱" name="email">
                <a-input v-model:value="form.email" placeholder="请输入邮箱" allow-clear />
                  </a-form-item>-->
                  <a-form-item style="flex-wrap: nowrap">
                    <template #label>
                      下载模式 &nbsp;
                      <a-tooltip title="当用户首次下载应用时，模式一会安装两次描述文件，模式二只会安装一次描述文件">
                        <info-circle-outlined />
                      </a-tooltip>
                    </template>
                    <a-radio-group v-model:value="form.downloadType">
                      <a-radio :value="1">模式一</a-radio>
                      <a-radio :value="2">模式二</a-radio>
                    </a-radio-group>
                    <p
                      v-if="form.downloadType === 1"
                      style="color:red;font-size:12px;margin-bottom:0;"
                    >当用户在本平台第一次安装V2模式应用时，会安装两次描述文件，重新下载或者再次下载其它本平台应用时，不会出现MDM负载不匹配的情况。</p>
                    <p
                      v-if="form.downloadType === 2"
                      style="color:red;font-size:12px;margin-bottom:0;"
                    >当用户下载V2模式应用时，只会安装一次描述文件，重新下载或者再次下载其它本平台应用时，可能会出现MDM负载不匹配的情况。</p>
                  </a-form-item>

                  <a-form-item style="flex-wrap: nowrap">
                    <template #label>
                      MDM引导 &nbsp;
                      <a-tooltip title="若用户是第一次使用MDM的签名，有助于提高用户安装MDM签名的成功率。">
                        <info-circle-outlined />
                      </a-tooltip>
                    </template>
                    <a-radio-group v-model:value="form.guideType">
                      <a-radio :value="1">只弹1次</a-radio>
                      <a-radio :value="2">每次安装都弹</a-radio>
                      <a-radio :value="3">不主动弹出</a-radio>
                      <p
                        v-if="form.guideType === 1"
                        style="color:red;font-size:12px;margin-bottom:0;"
                      >用户第一次安装的时候，安装页面会主动弹出【MDM有效负载不匹配】的帮助文档提示框。若用户重新下载时就不会再弹了。</p>
                      <p v-if="form.guideType === 2" style="color:red;font-size:12px;margin-bottom:0;">用户每次安装app都会主动弹出【MDM有效负载不匹配】的帮助提示框。</p>
                      <p v-if="form.guideType === 3" style="color:red;font-size:12px;margin-bottom:0;">用户安装app的时候都不主动弹出【MDM有效负载不匹配】的帮助提示框。</p>
                    </a-radio-group>
                  </a-form-item>
                  <a-form-item style="flex-wrap: nowrap">
                    <template #label>
                      安装方式 &nbsp;
                      <a-tooltip title="公开：用户可自主安装应用，滑块验证：用户下载应用时需要滑块验证通过后方可安装应用，下载码：用户下载应用时需要输入对应的下载码，验证通过后方可安装应用">
                        <info-circle-outlined />
                      </a-tooltip>
                    </template>
                    <a-radio-group v-model:value="form.installType">
                      <a-radio :value="0">公开</a-radio>
                      <a-radio :value="1">滑块验证</a-radio>
                      <a-radio :value="4">下载码</a-radio>
                    </a-radio-group>
                  </a-form-item>
                  <a-form-item style="flex-wrap: nowrap">
                    <template #label>
                      签名模式 &nbsp;
                      <a-tooltip
                        title="超级签名V2模式：MDM签名模式，安装时如果与其他家MDM平台冲突可能会出现MDM有效负载不匹配问题。，超级签V3模式：可以解决与其他家MDM冲突的问题，不会出现MDM有效负载不匹配的问题。，混合模式：当MDM的V2无法安装的情况下会自动切换到V3模式，确保用户能够正常下载APP。"
                      >
                        <info-circle-outlined />
                      </a-tooltip>
                    </template>
                    <a-radio-group v-model:value="form.signType">
                      <a-radio :value="0">V2 模式</a-radio>
                      <a-radio :value="1">V3 模式</a-radio>
                      <a-radio :value="2">混合模式</a-radio>

                      <p
                        v-if="form.signType === 0"
                        style="color:red;font-size:12px;margin-bottom:0;"
                      >MDM安装模式，若出现负载不匹配等情況，需要用户去设置里面卸载已有的移动管理文件，然后再进行签名安装。</p>
                      <p v-if="form.signType === 1" style="color:red;font-size:12px;margin-bottom:0;">不会出现MDM负载不匹配的问题，可直接安装应用，但需要用户手动信任证书。</p>
                      <p
                        v-if="form.signType === 2"
                        style="color:red;font-size:12px;margin-bottom:0;"
                      >用户优先使用V2的MDM模式进行签名安装，若出现MDM负载不匹配等情况，用户可点击【重试】使用V3模式，减少用户操作步骤，保证用户都能安装成功，提高应用的注册率。</p>
                    </a-radio-group>
                  </a-form-item>
                  <a-form-item style="flex-wrap: nowrap">
                    <template #label>
                      自动安装 &nbsp;
                      <a-tooltip title="开启自动安装后，苹果手机用户打开下载页面时会自动弹出允许描述文件的安装提示">
                        <info-circle-outlined />
                      </a-tooltip>
                    </template>
                    <a-radio-group v-model:value="form.autoInstallFlag">
                      <a-radio :value="1">开启</a-radio>
                      <a-radio :value="0">关闭</a-radio>
                    </a-radio-group>
                  </a-form-item>
                  <a-form-item style="flex-wrap: nowrap">
                    <template #label>
                      闪退助手 &nbsp;
                      <a-tooltip title="签名完成后会提示用户安装闪退助手，桌面会生成一个闪退助手图标，打开闪退助手后可以直接重新下载当前应用，利于提高用户留存率">
                        <info-circle-outlined />
                      </a-tooltip>
                    </template>
                    <a-radio-group v-model:value="form.antiCrash">
                      <a-radio :value="1">开启</a-radio>
                      <a-radio :value="0">关闭</a-radio>
                      <a-radio :value="2">自定义链接</a-radio>
                      <a-input v-if="form.antiCrash === 2" v-model:value="form.antiCustomUrl" placeholder="建议输入您落地页的链接" allow-clear />
                    </a-radio-group>
                  </a-form-item>

                  <a-form-item name="sex">
                    <template #label>
                      页面语言 &nbsp;
                      <a-tooltip title="应用下载页面的显示语言">
                        <info-circle-outlined />
                      </a-tooltip>
                    </template>
                    <a-select v-model:value="form.lang" placeholder="请选择页面语言" allow-clear>
                      <a-select-option :value="0">简体中文</a-select-option>
                      <a-select-option :value="1">英语-English</a-select-option>
                      <a-select-option :value="2">泰国语-ไทย</a-select-option>
                      <a-select-option :value="3">越南语-Tiếng Việt</a-select-option>
                      <a-select-option :value="4">印度语-हिंदी</a-select-option>
                      <a-select-option :value="5">印度尼西亚-Indonesia</a-select-option>
                      <a-select-option :value="6">繁體中文（台湾）</a-select-option>
                      <a-select-option :value="7">自动识别</a-select-option>
                      <a-select-option :value="8">日语</a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="CNZZ统计">
                    <a-input v-model:value="form.cnzz" placeholder="请输入CNZZ站点ID" allow-clear />
                  </a-form-item>
                  <a-form-item label="应用简介">
                    <a-textarea v-model:value="form.introduction" placeholder="请输入应用简介" :rows="4" />
                  </a-form-item>
                  <a-form-item :wrapper-col="{ md: { offset: 6 } }">
                    <a-button type="primary" :loading="loading" @click="save">{{ loading ? '提交中..' : '提交' }}</a-button>
                  </a-form-item>
                </a-form>
              </a-spin>
            </a-tab-pane>
            <a-tab-pane tab="页面设置" key="shezhi">
              <a-spin :spinning="loading">
                <a-form
                  ref="formRef2"
                  :model="form2"
                  :label-col="{ lg: 4, md: 6, sm: 4, xs: 24 }"
                  :wrapper-col="{ lg: 20, md: 18, sm: 20, xs: 24 }"
                  style=" margin-top: 20px"
                >
                  <!-- <a-form-item label="昵称" name="nickname">
                <a-input v-model:value="form.nickname" placeholder="请输入昵称" allow-clear />
              </a-form-item>
              <a-form-item label="邮箱" name="email">
                <a-input v-model:value="form.email" placeholder="请输入邮箱" allow-clear />
                  </a-form-item>-->
                  <a-form-item style="flex-wrap: nowrap">
                    <template #label>
                      页面模板 &nbsp;
                      <a-tooltip title="若用户对MDM下载流程不熟悉的情况下可选择模板二">
                        <info-circle-outlined />
                      </a-tooltip>
                    </template>
                    <a-radio-group v-model:value="form2.downloadStyle">
                      <a-radio :value="1">模板一</a-radio>
                      <a-radio :value="2">模板二</a-radio>
                    </a-radio-group>
                    <p v-if="form2.downloadStyle === 1" style="color:red;font-size:12px;margin-bottom:0;">App Store经典下载页模板</p>
                    <p v-if="form2.downloadStyle === 2" style="color:red;font-size:12px;margin-bottom:0;">下载页顶部会展示MDM安装的引导教程</p>
                  </a-form-item>
                  <a-form-item label="在线客服">
                    <a-textarea v-model:value="form2.chatLink" placeholder="填写在线客服网址，下载页面将展示客服信息" :rows="4" />
                  </a-form-item>
                  <a-form-item label="评论标题">
                    <a-input v-model:value="form2.commentTitle" placeholder="请输入评论标题" allow-clear />
                  </a-form-item>
                  <a-form-item label="评论内容">
                    <a-textarea v-model:value="form2.comment" placeholder="请输入评论内容" :rows="4" />
                  </a-form-item>
                  <a-form-item label="应用截图" style="flex-wrap: nowrap">
                    <a-radio-group v-model:value="form2.imageType">
                      <a-radio :value="0">竖屏</a-radio>
                      <a-radio :value="1">横屏</a-radio>
                    </a-radio-group>
                    <p v-if="form2.imageType === 0">
                      <span style="color: #999;font-size: 12px;">
                        建议上传
                        <label style="color: red;" class="slide-size-hint">720*1280</label>图片，
                        最多上传
                        <label style="color: red;">6</label>张
                      </span>
                    </p>
                    <p v-if="form2.imageType === 1">
                      <span style="color: #999;font-size: 12px;">
                        建议上传
                        <label style="color: red;" class="slide-size-hint">1920*1080</label>图片，
                        最多上传
                        <label style="color: red;">6</label>张
                      </span>
                    </p>
                  </a-form-item>
                  <a-form-item label=" " :colon="false">
                    <div class="imgs-class" :class="[form2.imageType == 0 ? 'verticalScreen' : 'landscapeScreen']">
                      <div class="img-warp" v-for="(item, index) in getCureenImages" :key="index">
                        <img :src="item" />
                        <img src="@/assets/close.webp" class="cleanUp-class" @click="closeImg(index)" />
                      </div>
                      <a-upload-dragger
                        accept="image/*"
                        :show-upload-list="false"
                        :customRequest="doUpload"
                        v-show="uploadImage.length <= 5"
                        style="padding: 24px 0; margin-bottom: 16px; transition: width 1s;"
                        :style="{ 'width': form2.imageType == 0 ? '140px' : '250px', 'height': form2.imageType == 0 ? '250px' : '140px', }"
                      >
                        <p class="ant-upload-drag-icon">
                          <cloud-upload-outlined />
                        </p>
                        <p class="ant-upload-hint">点击上传，或将图片拖拽到此处</p>
                      </a-upload-dragger>
                    </div>
                  </a-form-item>
                  <a-form-item :wrapper-col="{ md: { offset: 6 } }">
                    <a-button type="primary" :loading="loading" @click="save2">{{ loading ? '提交中..' : '提交' }}</a-button>
                  </a-form-item>
                </a-form>
              </a-spin>
            </a-tab-pane>
            <a-tab-pane tab="签发记录" key="jilu">
              <list-page ref="listPage" />
            </a-tab-pane>
            <a-tab-pane tab="数据统计" key="tongji">
              <statistics />
            </a-tab-pane>
            <a-tab-pane tab="合并安卓" key="hebing">
              <MergeAndroid :form="form" />
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>
    <!-- 头像裁剪弹窗 -->
    <ele-cropper-modal
      :src="AppInfo.avatar"
      v-model:visible="visible"
      :options="{ autoCropArea: 1, viewMode: 1, dragMode: 'move' }"
      @done="onCrop"
      :to-blob="true"
    />
    <!-- 备注弹窗 -->
    <ele-modal
      :width="400"
      title="设置备注"
      v-model:visible="visible1"
      :resizable="true"
      :maxable="true"
      @cancel="visible1 = false"
      @ok="remarksave"
    >
      <a-form ref="remarkformRef" :model="remarkform" :label-col="{ flex: '70px' }" :wrapper-col="{ flex: '1' }">
        <a-form-item label="备注" style="flex-wrap: nowrap">
          <a-textarea :rows="4" placeholder="请输入备注" v-model:value="remarkform.remark" />
        </a-form-item>
      </a-form>
    </ele-modal>

    <UploadIpa v-model:visible="showImport" @done="downloadAppInfo" isUpdate :title="title" :uploadParams="uploadParams"></UploadIpa>
  </div>
</template>

<script setup>
import {
  createVNode,
  ref,
  unref,
  reactive,
  computed,
  onMounted,
  watch
} from 'vue';
import { useRouter } from 'vue-router';
import { message, Modal } from 'ant-design-vue/es';
import { getUser } from '@/api/system/user';
import { removePageTab } from '@/utils/page-tab-util';
import request from '@/utils/request';
import requestImage from '@/utils/requestImage';
import ListPage from './component/list-page.vue';
import Statistics from './component/statistics.vue';
import MergeAndroid from './component/mergeAndroid.vue';
import { getBase64WithFile, getBase64Image } from '@/utils/image';
import UploadIpa from '@/components/UploadIpa/index.vue';
import {
  CloudUploadOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  QrcodeOutlined,
  UploadOutlined,
  UserOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  TagOutlined,
  QqOutlined,
  WechatOutlined,
  AlipayOutlined,
  CopyOutlined
} from '@ant-design/icons-vue';

import { useUserStore } from '@/store/modules/user';
import { API_IPA_URL } from '@/config/setting';

const userStore = useUserStore();

//
const formRef = ref(null);
//
const formRef2 = ref(null);
//
const remarkformRef = ref(null);

const title = ref('更新应用');
const uploadParams = ref({});
// tab 页选中
const active = ref('info');

// 保存按钮 loading
const loading = ref(false);

// 是否显示裁剪弹窗
const visible = ref(false);

// 是否显示备注弹窗
const visible1 = ref(false);

// 登录用户信息
const loginUser = computed(() => userStore.info ?? {});

// 表单数据
const form = reactive({
  downloadType: '',
  androidUrl: '',
  guideType: '',
  installType: '',
  signType: '',
  autoInstallFlag: 1,
  isOpenAndroid: 0,
  antiCrash: '',
  lang: '',
  cnzz: '',
  introduction: '',
  antiCustomUrl: ''
});
const showImport = ref(false);
function updateApp(modelTitle) {
  title.value = modelTitle;
  if (title.value == '更新已重签包') {
    uploadParams.value = {
      isUploadSignedIpa: 1,
      isTest: location.href.indexOf('mytest1234') > -1 ? 1 : 0
    };
  }
  if (title.value == '更新源包') {
    uploadParams.value = {
      isTest: location.href.indexOf('mytest1234') > -1 ? 1 : 0
    };
  }

  showImport.value = true;
}
// 表单数据
const form2 = reactive({});

/* 修改应用状态 */
const editStatus = (checked) => {
  const status = checked ? 1 : 0;
  var hint = status === 1 ? '上架' : '下架';
  Modal.confirm({
    title: '提示',
    content: '确定' + hint + '吗？',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: () => {
      const { query } = unref(currentRoute);
      let body = { appId: query.appId, appStatus: status };
      request
        .post('/ipa/update_app', body)
        .then((res) => {
          downloadAppInfo();
          message.success(res.data.msg);
        })
        .catch((e) => {
          message.error(e.response.data.msg);
        });
    }
  });
};

// 备注数据
const remarkform = reactive({
  remark: ''
});
// 更改备注
const remarksave = () => {
  if (!remarkform.remark) {
    message.info('请输入备注');
    return;
  }
  const { query } = unref(currentRoute);
  let body = { appId: query.appId, remark: remarkform.remark };
  request
    .post('/ipa/update_app', body)
    .then((res) => {
      visible1.value = false;
      message.success(res.data.msg);
      downloadAppInfo();
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};

// 表单验证规则
const rules = reactive({
  // nickname: [
  //   {
  //     required: true,
  //     message: '请输入昵称',
  //     type: 'string'
  //   }
  // ],
});

// /* 修改登录用户 */
// const updateLoginUser = (obj) => {
//   userStore.setInfo({ ...loginUser.value, ...obj });
// };

/* 基础设置保存更改 */
const save = () => {
  loading.value = true;
  console.log(form);

  const { query } = unref(currentRoute);
  let body = form;
  body.appId = query.appId;
  body.settingPage = 1; // 这个字段没弄明白什么意思
  body.mdmInstallType = form.downloadType === 1 ? '1' : '0';
  body.downloadType = form.downloadType + '';
  body.guideType = form.guideType + '';
  body.guideTypeType = form.guideType + '';
  body.installType = form.installType + '';
  body.signType = form.signType + '';
  body.signTypeText = form.signType + '';
  body.antiCrash = form.antiCrash + '';
  body.cnzz = !form.cnzz ? '' : form.cnzz;
  body.lang = form.lang + '';
  body.autoInstallFlag = form.autoInstallFlag + '';

  request
    .post('/ipa/update_app', body)
    .then((res) => {
      downloadAppInfo();
      loading.value = false;
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};

/* 页面设置保存更改 */
const save2 = () => {
  loading.value = true;
  console.log(form2);

  const { query } = unref(currentRoute);
  let body = form2;
  body.appId = query.appId;
  body.downloadStyleType = 1;
  body.settingPage = 2; //好像标识的在哪个页签

  // body.autoInstallFlag = form.autoInstallFlag + '';

  request
    .post('/ipa/update_app', body)
    .then((res) => {
      downloadAppInfo();
      loading.value = false;
      message.success(res.data.msg);
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};

/* 头像裁剪完成回调 */
const onCrop = (result) => {
  // updateLoginUser(form);
  const { query } = unref(currentRoute);
  const token = localStorage.getItem('token') || '';
  const formData = new FormData();
  formData.append('imgFile', result);
  formData.append('appId', query.appId);
  formData.append('imgType', 1);

  visible.value = false;
  requestImage
    .postForm(`${API_IPA_URL}/file/uploadAppInfo`, formData)
    .then((res) => {
      if (res.data.status == 200) {
        // window.location.reload();
        downloadAppInfo();
      }
    });
  // .catch((e) => {
  //   message.error(e.response.data.msg);
  // });
};

/* 打开图片裁剪 */
const openCropper = () => {
  visible.value = true;
};

const { currentRoute, push } = useRouter();
// const appId = ref('');
// appId.value = currentRoute.value.query.appId

// 查询状态
// const loading = ref(false);

const uploadImage = ref([]);

const AppInfo = ref({});

// 获取应用详情
const downloadAppInfo = () => {
  const { query } = unref(currentRoute);
  let body = { appId: query.appId, isSetting: 1 };
  request
    .post('/ipa/download_app_info', body)
    .then((res) => {
      remarkform.remark = res.data.data.remark; // 备注回显

      // 基础设置回显
      form.androidUrl = res.data.data.androidUrl;
      form.downloadType = res.data.data.downloadType;
      form.guideType = res.data.data.guideType;
      form.installType = res.data.data.installType;
      form.signType = res.data.data.signType;
      form.antiCrash = res.data.data.antiCrash;
      form.lang = res.data.data.lang;
      form.cnzz = res.data.data.cnzz;
      form.isOpenAndroid = res.data.data.isOpenAndroid;
      form.introduction = res.data.data.introduction;
      AppInfo.value = res.data.data;
      // AppInfo.value.avatar = res.data.data.icon?getBase64Image(res.data.data.icon):'';
      AppInfo.value.avatar = res.data.data.icon;

      form2.comment = res.data.data.comment;
      form2.commentTitle = res.data.data.commentTitle;
      form2.chatLink = res.data.data.chatLink;
      form2.downloadStyle = res.data.data.downloadStyle;
      form2.imageType = res.data.data.imageType;
      form2.images = res.data.data.images;
      if (JSON.parse(form2.images)) {
        uploadImage.value = JSON.parse(form2.images);
      }
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};

const getCureenImages = computed(() => {
  return uploadImage.value;
});

const UserData = ref({});

// 获取应用详情
const UserDataList = () => {
  const { query } = unref(currentRoute);
  let body = { appId: query.appId };
  request
    .post('/backstage/getUserData', body)
    .then((res) => {
      UserData.value = res.data.data;
      // message.success(res.data.msg);
    })
    .catch((e) => {
      message.error(e.response.data.msg);
    });
};

// 用户信息
const user = ref();

/* 关闭当前页面并跳转到账户首页 */
const onClose = () => {
  removePageTab({ key: unref(currentRoute).path });
  push('/dashboard/workplace');
};

/* 查询用户信息 */
// const query = () => {
//   const { query } = unref(currentRoute);
//   if (query.id) {
//     getUser(Number(query.id))
//       .then((data) => {
//         loading.value = false;
//         user.value = data;
//       })
//       .catch((e) => {
//         message.error(e.message);
//       });
//   }
// };

// query();

// 复制下载地址
const copyDetail = (value) => {
  var input_temp = document.createElement('input');
  input_temp.value = value;
  document.body.appendChild(input_temp);
  input_temp.select();
  document.execCommand('copy');
  document.body.removeChild(input_temp);
  message.success('复制成功！');
};

const getfilesize = (size) => {
  if (!size) return '';
  var num = 1024.0;
  if (size < num) return size + 'B';
  if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + 'KB';
  if (size < Math.pow(num, 3))
    return (size / Math.pow(num, 2)).toFixed(2) + 'M';
  if (size < Math.pow(num, 4))
    return (size / Math.pow(num, 3)).toFixed(2) + 'G';
  return (size / Math.pow(num, 4)).toFixed(2) + 'T';
};

function doUpload({ file }) {
  const formData = new FormData();
  const flagId = localStorage.getItem('flagId') || '';
  formData.append('flagId', flagId);
  formData.append('imgFile', file);

  requestImage
    .post('https://file.xiaohuagnchong.com/file/uploadAppInfo', formData, {
      onUploadProgress(progressEvent) {
        const schedule =
          ((progressEvent.loaded / progressEvent.total) * 100) | 0;
        if (schedule != 100) {
          // complete.value = schedule
        } else {
          // complete.value = 99
        }
      }
    })
    .then(async (res) => {
      // 1.获取到地址 2.存到form2.images内
      const images = JSON.parse(form2.images);
      images.push(res.data.data.iconPath);
      form2.images = JSON.stringify(images);
      const base64 = await getBase64WithFile(file);
      uploadImage.value.push(base64.result);
    })
    .catch((e) => {
      errorUpload.value = true;
      message.error('上传失败！');
    });
}

function closeImg(index) {
  const images = JSON.parse(form2.images);
  const fliterImages = images.filter((i, ind) => {
    return ind != index;
  });
  form2.images = JSON.stringify(fliterImages);
  uploadImage.value = uploadImage.value.filter((i, ind) => {
    return ind != index;
  });
}

// watch(()=>currentRoute,(n,o)=>{
//   const { query  } = n.value
//   debugger
// },{immediate:true})
const isAdmin = ref(false);
onMounted(() => {
  const { query } = unref(currentRoute);
  if (query.isAdmin) {
    isAdmin.value = true;
  }
  // 获取应用详情
  downloadAppInfo();
  //获取下载量
  UserDataList();
});
</script>

<script>
export default {
  name: 'ListBasicEdit'
};
</script>
<style lang="less" scoped>
.ele-body-card {
  // display: flex;
  // justify-content: flex-start;
  // align-items: flex-start;
}
.cloumn-class {
  background: #fff;
}
.btns-class {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 10px;
}

/* 用户资料卡片 */
.user-info-avatar-group {
  margin: 16px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;

  .user-info-avatar-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 30px;
    display: none;
    z-index: 2;
  }

  &:hover .user-info-avatar-icon {
    display: block;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: transparent;
    transition: background-color 0.3s;
  }

  &:hover:after {
    background-color: rgba(0, 0, 0, 0.4);
  }

  & + h1 {
    margin-bottom: 8px;
  }
}

/* 用户信息列表 */
.user-info-list {
  margin: 47px 0 32px 0;

  .ele-cell + .ele-cell {
    margin-top: 16px;
  }

  & + .ant-divider {
    margin-bottom: 16px;
  }
}

/* 用户标签 */
.user-info-tags {
  margin: 16px 0 4px 0;

  .ant-tag {
    margin: 0 12px 8px 0;
  }
}

/* 用户账号绑定列表 */
.user-account-list {
  & > .ele-cell {
    padding: 16px 8px;
  }

  .user-account-icon {
    color: #fff;
    padding: 8px;
    font-size: 26px;
    border-radius: 50%;

    &.anticon-qq {
      background: #3492ed;
    }

    &.anticon-wechat {
      background: #4daf29;
    }

    &.anticon-alipay {
      background: #1476fe;
    }
  }
}

.imgs-class {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  img {
    transition: width 1s;
  }

  .img-warp {
    position: relative;

    .cleanUp-class {
      width: 35px;
      height: 35px;
      cursor: pointer;
      position: absolute;
      top: -2px;
      right: -2px;
    }
  }
}

.verticalScreen {
  img {
    width: 140px;
    height: 200px;
  }
}

.landscapeScreen {
  img {
    width: 250px;
    height: 170px;
  }
}
</style>

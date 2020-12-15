/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import fs from 'fs';
import { promisify } from 'util';

import { getLogFilePath } from '../logger';
import { reportCloudBaseCIResultCallback } from '../api/app';
import Context from '../context';

export default class LifeCycleManager {
  constructor(public context: Context) {}

  /**
   * 上报信息
   * @param status
   */
  async reportBuildResult(status: number, failReason?: string) {
    const buildLog = await this.getBuildLog();

    return reportCloudBaseCIResultCallback({
      ciId: this.context.ciId,
      extensionId: this.context.extensionId,
      status,
      failReason,
      buildLog,
    });
  }

  /**
   * 查询构建日志
   */
  async getBuildLog() {
    const logFilePath = getLogFilePath();
    return promisify(fs.readFile)(logFilePath, 'utf-8');
  }
}

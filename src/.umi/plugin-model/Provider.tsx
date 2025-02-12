// @ts-nocheck
import React from 'react';
import initialState from 'C:/Users/ASUS/Documents/Gitlab/baseltw/src/.umi/plugin-initial-state/models/initialState';
import model0 from "C:/Users/ASUS/Documents/Gitlab/baseltw/src/models/danhmuc/chucvu";
import model1 from "C:/Users/ASUS/Documents/Gitlab/baseltw/src/models/import";
import model2 from "C:/Users/ASUS/Documents/Gitlab/baseltw/src/models/randomuser";
import model3 from "C:/Users/ASUS/Documents/Gitlab/baseltw/src/models/thongbao/nhansu";
import model4 from "C:/Users/ASUS/Documents/Gitlab/baseltw/src/models/thongbao/noticeicon";
import model5 from "C:/Users/ASUS/Documents/Gitlab/baseltw/src/models/thongbao/receiver";
import model6 from "C:/Users/ASUS/Documents/Gitlab/baseltw/src/models/thongbao/sinhvien";
import model7 from "C:/Users/ASUS/Documents/Gitlab/baseltw/src/models/thongbao/thongbao";
import model8 from "C:/Users/ASUS/Documents/Gitlab/baseltw/src/models/tienich/auditlog";
import model9 from "C:/Users/ASUS/Documents/Gitlab/baseltw/src/models/tienich/caidat";
import model10 from "C:/Users/ASUS/Documents/Gitlab/baseltw/src/models/tienich/phanhoi";
// @ts-ignore
import Dispatcher from './helpers/dispatcher';
// @ts-ignore
import Executor from './helpers/executor';
// @ts-ignore
import { UmiContext } from './helpers/constant';

export const models = { '@@initialState': initialState, 'danhmuc.chucvu': model0, 'import': model1, 'randomuser': model2, 'thongbao.nhansu': model3, 'thongbao.noticeicon': model4, 'thongbao.receiver': model5, 'thongbao.sinhvien': model6, 'thongbao.thongbao': model7, 'tienich.auditlog': model8, 'tienich.caidat': model9, 'tienich.phanhoi': model10 };

export type Model<T extends keyof typeof models> = {
  [key in keyof typeof models]: ReturnType<typeof models[T]>;
};

export type Models<T extends keyof typeof models> = Model<T>[T]

const dispatcher = new Dispatcher!();
const Exe = Executor!;

export default ({ children }: { children: React.ReactNode }) => {

  return (
    <UmiContext.Provider value={dispatcher}>
      {
        Object.entries(models).map(pair => (
          <Exe key={pair[0]} namespace={pair[0]} hook={pair[1] as any} onUpdate={(val: any) => {
            const [ns] = pair as [keyof typeof models, any];
            dispatcher.data[ns] = val;
            dispatcher.update(ns);
          }} />
        ))
      }
      {children}
    </UmiContext.Provider>
  )
}

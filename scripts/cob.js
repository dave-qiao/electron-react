const { execSync } = require('child_process');
const repl = require('./prompt');

// 先删除远端已删除的分支
execSync('git fetch -p');

const reCamel = /^[a-z][a-zA-Z]+$/;

const fix = d => (d / 100).toFixed(2).slice(2);

const getBranch = data => {
  const now = new Date();
  const today = `${now.getFullYear()}${fix(now.getMonth() + 1)}${fix(
    now.getDate()
  )}`;
  return `${data.jira}-${today}-${data.name}`;
};

const prompt = [
  {
    name: 'jira',
    title: '请输入 JIRA 编号',
    description: '格式例如 WP-888，没有 JIRA 不开发',
    validate: value => {
      if (/^[A-Z]+-\d+$/.test(value)) {
        return true;
      }
      return '请输入正确的 JIRA 编号';
    }
  },
  {
    name: 'name',
    title: '请输入分支描述',
    description: '分支表述必须为驼峰格式，如：coupons、promotionActive',
    default: 'bugfix',
    validate: value => {
      if (reCamel.test(value)) {
        return true;
      }
      return '分支表述必须为驼峰格式';
    }
  },
  {
    name: 'confirm',
    title: data => {
      const branch = getBranch(data);
      return `创建分支 ${branch} [Y/n]`;
    },
    default: 'y'
  }
];

const currentBranch = execSync('git rev-parse --abbrev-ref HEAD')
  .toString('utf8')
  .replace(/[\r\n]/g, '');

const noMasterPrompt = [
  {
    name: 'confirm',
    title: () => '当前分支不是 master 分支，请基于该分支创建？[y/N]',
    default: 'n'
  }
];

const cob = () =>
  repl(prompt, data => {
    const branch = getBranch(data);
    if (/y/i.test(data.confirm)) {
      execSync(`git checkout -b ${branch}`);
    }
  });

if (currentBranch !== 'master') {
  repl(noMasterPrompt, data => {
    if (/y/i.test(data.confirm)) {
      cob();
    }
  });
} else {
  cob();
}

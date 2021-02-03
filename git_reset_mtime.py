# -*- coding: utf-8 -*-

import subprocess
import os
import shlex

if __name__ != '__main__':
    raise ImportError("%s should not be used as a module." % __name__)

# 'git ls-files -z | xargs -0 -n1 -I{} -- git log -1 --format="%ct {}" {} | sort'
git_ls_cmd = 'git ls-files -z'
xargs_cmd = 'xargs -0 -n1 -I{} -- git log -1 --format="%ct {}" {}'
sort_cmd = 'sort'

work_dir = os.getcwd()

git_ls_result = subprocess.Popen(shlex.split(git_ls_cmd), stdout=subprocess.PIPE)
xargs_result = subprocess.Popen(shlex.split(xargs_cmd), stdin=git_ls_result.stdout, stdout=subprocess.PIPE)
result = subprocess.check_output('sort', stdin=xargs_result.stdout)

timestamp_file_list = [tuple(it.split(' ', 1)) for it in result.decode('utf-8').split('\n')][:-1]

for timestamp, file_path in timestamp_file_list:
    os.utime(os.path.join(work_dir, file_path), (int(timestamp), int(timestamp)))

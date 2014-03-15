# -*- coding: utf-8 -*-

from nikola.plugin_categories import Task
from nikola import utils
from nikola.utils import LOGGER
import os
from doit.action import CmdAction
from sarge import run
import codecs
import shutil


def create_code_css(color_scheme, code_css_path):
    from pygments.formatters import get_formatter_by_name
    formatter = get_formatter_by_name('html', style=color_scheme)
    utils.makedirs(os.path.dirname(code_css_path))
    with codecs.open(code_css_path, 'wb', 'utf8') as outf:
        outf.write(formatter.get_style_defs(['pre.code', 'div.code pre']))
        outf.write("\ntable.codetable { width: 100%;} td.linenos {text-align: right; width: 4em;}\n")

class Plugin(Task):

    name = "compilecss"

    def gen_tasks(self):

        def generate_css():
            # Compass compile
            for theme_name in self.site.THEMES:

                theme_root = os.path.abspath(utils.get_theme_path(theme_name))
                compass_root = os.path.abspath(os.path.join(theme_root, 'style'))
                tmp_dir = os.path.abspath(os.path.join(theme_root, '_tmp'))

                if os.path.exists(compass_root):

                    LOGGER.notice("PYGMENTS CSS CODE")
                    create_code_css(self.site.config['CODE_COLOR_SCHEME'],
                                    os.path.join(compass_root, 'css', 'code.css'))


                    LOGGER.notice("COMPASS COMPILE")
                    run('compass clean', cwd=compass_root)
                    run('compass compile', cwd=compass_root)

                    LOGGER.notice("AUTOPREFIXER")
                    LOGGER.notice("CWD: {}".format(theme_root))
                    run('autoprefixer -o _tmp/all.pre.css _tmp/all.css', cwd=theme_root)

                    LOGGER.notice("CSSO (CSS optimizer)")
                    LOGGER.notice("CWD: {}".format(theme_root))
                    run('csso _tmp/all.pre.css _tmp/all.min.css', cwd=theme_root)


                    LOGGER.notice("Move CSS to output")
                    css_output_dir = os.path.join(os.path.abspath(self.site.config['OUTPUT_FOLDER']), 'assets', 'css')
                    utils.makedirs(css_output_dir)
                    shutil.copy2(os.path.join(tmp_dir, 'all.min.css'), css_output_dir)


        # Yield a task for Doit
        yield {
            'basename': 'compilecss',
            'actions': [(generate_css, )],
            'uptodate': [False],
        }

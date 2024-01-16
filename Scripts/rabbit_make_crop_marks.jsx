var the_title = "MakeCropMarksAI";
var the_version = "1.1";
//
var AD; // активный док-т
var AL; // активный слой
var SL; // выбранный слой
var the_sel; // выделение в акт. док-те
var sel_init;
// границы
var v_sel_left = new Array(); //левые границы выделения объектов
var g_sel_left = new Array(); //левые границы выделения объектов
var v_sel_right = new Array(); //правые границы выделения объектов
var g_sel_right = new Array(); //правые границы выделения объектов
var v_sel_top = new Array(); //верхние границы выделения объектов
var g_sel_top = new Array(); //верхние границы выделения объектов
var v_sel_bottom = new Array(); // нижние границы выделения объектов
var g_sel_bottom = new Array(); // нижние границы выделения объектов
// для границ объектов c учетом клип. масок
var NC_v_left = new Array();
var NC_g_left = new Array();
var NC_v_top = new Array();
var NC_g_top = new Array();
var NC_v_right = new Array();
var NC_g_right = new Array();
var NC_v_bottom = new Array();
var NC_g_bottom = new Array();
// наличие клип. масок влияющих на выделение
var CLIP = false;
var NO_CLIP_OBJ_TO_SHOW = new Array();
// делать с учетом клип. масок
var MAKE_BY_CLIP = false;
//
var N_sel = 0; // кол-во объектов в выделении
var N_doc = 0; //  кол-во док-тов в иллюстраторе
var dlg; // основной диалог
var BLEED_VAL;
var BL = "\n"; // первод строки
var exit_if_bad_input = false;
var exit_if_bad_sel = false;
// единицы измерения
// выбор д диалоге
var OBJ_DROP, UNITS_DROP, BOUNDS_DROP, LAYER_DROP;
// выбранные направления
var DIR_SELECTED;
// успешный ввод
INP_OK = true;
// нет док-тов
var NO_DOC = false;
// цвет для меток
var REG, WHITE;
//
// объекты для построения
var OBJECTS_TO_MAKE = "";
var BOUNDS_TO_MAKE = "Visible";
var BOUNDS_INI = 1;
// массив всех меток
var ALL_MARKS = new Array();
// массив размеров уже сделанных меток
var L_MADE = new Array();
var T_MADE = new Array();
var R_MADE = new Array();
var B_MADE = new Array();
// массив цвета уже сделанных меток
var C_MADE = new Array();
var BL = "\n"; // первод строки
//
var UNITS_TEXT = "mm";
var WHERE = "";
var B_DROP_ACTIVE = false;
var NO_DIR = false;
var cb_tl, cb_tc, cb_tr;
var cb_rt, cb_rc, cb_rb;
var cb_bl, cb_bc, cb_br;
var cb_lt, cb_lc, cb_lb;
var b_clear_all, b_set_all;
var w_cont;
var g_m;
var W_CONT_INI;
var g_m_ini;
var LENGTH_VER, LENGTH_HOR;
var LENGTH_VER_INI, LENGTH_HOR_INI;
var OFFSET_VER, OFFSET_HOR;
var OFFSET_VER_INI, OFFSET_HOR_INI;
var BLEED_VER, BLEED_HOR;
var BLEED_VER_INI, BLEED_HOR_INI;
var str_w_ed_text, SW_NUM;
var str_un_drop;
var SW_NUM_INI;
var SW_UN_INI = 2;
var VER_HOR_ARR = new Array();
//
var INI_FILE = new File();
var INI_EXISTS = true;
var INI_ERR = false;
// файловая система
var WFS = false;
//
var BAD_VAL = false;
//
// вызов главной подпрограммы
main();
// окончание выполнения скрипта :)))
//
// блок описания подпрограмм
// основная подпрограмма
function main() {
  // вызываем проверку док-та и выделения
  if (CHECK_SELECTION()) {
    // получаем координаты выделенных объектов
    SELECTION_DIM();
    // если в порядке выделение и док-т:
    // устанавливаем начальные значения параметров для диалога
    INI_READ();
    //создаем диалог
    dlg = new Window("dialog");
    // определяем файловую систему
    if (File.fs == "Windows") WFS = true;
    dlg.text = the_title + " v." + the_version; // заголовок диалога
    dlg.childrenAlignment = "center";
    // создание панели чекбоксов для выбора вариантов по направлению
    var mp = dlg.add("panel");
    var mp_left = 5;
    var mp_top = 5;
    var mp_right = 435;
    var mp_bottom = 197;
    mp.bounds = [mp_left, mp_top, mp_right, mp_bottom];
    // габариты чекбокса
    var cb_w = 20;
    var cb_h = 15;
    // шаг чекбоксов по горизонтали
    var cb_dx = 50;
    // шаг чекбоксов по вертикали
    var cb_dy = 50;
    //
    // подпрограмма создания чекбокса
    function MAKE_CB(x, y, s, where) {
      var cb = where.add("checkbox");
      cb.value = s;
      var c_w = cb_w;
      if (WFS) c_w = 15;
      cb.bounds = [x, y, x + c_w, y + cb_h];
      return cb;
    } // end MAKE_CB
    //
    // подпрограмма создания дропдауна
    function MAKE_DROP(where, x, y, w, h, arr, ini) {
      var d = where.add("dropdownlist");
      d.bounds = [x, y, x + w, y + h];
      for (var i = 0; i < arr.length; i++) d.add("item", arr[i]);
      d.selection = ini;
      return d;
    } // end MAKE_DROP
    //
    // подпрограмма создания чекбокса в диалоге
    function MAKE_CB_DIAL(where, x, y, w, h, text, ini) {
      var c = where.add("checkbox");
      c.bounds = [x, y, x + w, y + h];
      c.text = text;
      c.value = ini;
      return c;
    } // end MAKE_CB_DIAL
    //
    // подпрограмма создания горизонтальной группы чекбоксов
    function HOR_CB_GROUP(x, y, where) {
      var cb_arr = new Array();
      var x_cb = x;
      var s = false;
      for (var i = 0; i < 3; i++) {
        var dx = 0;
        if (i == 0) {
          if (WFS) dx = -3;
        }
        if (i == 1) {
          dx = -5;
          if (WFS) dx = -6;
        }
        if (i == 2) {
          dx = -9;
          if (WFS) dx = -10;
        }
        cb_arr[i] = MAKE_CB(x_cb + dx, y, s, where);
        x_cb = x_cb + cb_dx;
      } // for
      return cb_arr;
    } // end HOR_CB_GROUP
    //
    // подпрограмма создания вертикальной группы чекбоксов
    function VER_CB_GROUP(x, y, where) {
      var cb_arr = new Array();
      var y_cb = y;
      var s = false;
      for (var i = 0; i < 3; i++) {
        var dy = 0;
        if (i == 0) {
          dy = 0;
          if (WFS) dy = 0;
        }
        if (i == 1) {
          dy = -2;
          if (WFS) dy = -3;
        }
        if (i == 2) {
          dy = -5;
          if (WFS) dy = -5;
        }
        cb_arr[i] = MAKE_CB(x, y_cb + dy, s, where);
        y_cb = y_cb + cb_dy;
      } // for
      return cb_arr;
    } // end VER_CB_GROUP
    //
    // подпрограмма создания кнопки
    function MAKE_BUTTON(x, y, w, where, txt) {
      var b = where.add("button");
      var btn_h = 20;
      b.text = txt;
      b.bounds = [x, y, x + w, y + btn_h];
      return b;
    } // end MAKE_BUTTON
    //
    // подпрограмма создания блока выбора направлений
    function MAKE_DIRECTIONS(x, y) {
      var cb_arr = new Array();
      var top_bottom_dx = 0;
      if (WFS) top_bottom_dx = 5;
      // left
      var left_dx = 0;
      if (WFS) left_dx = 4;
      cb_arr = VER_CB_GROUP(x + 2 + left_dx, y + cb_h + 2, mp);
      cb_lt = cb_arr[0];
      cb_lc = cb_arr[1];
      cb_lb = cb_arr[2];
      // top
      var top_dy = -1;
      if (WFS) top_dy = 0;
      cb_arr = HOR_CB_GROUP(x + cb_w + top_bottom_dx, y + top_dy, mp);
      cb_tl = cb_arr[0];
      cb_tc = cb_arr[1];
      cb_tr = cb_arr[2];
      // right
      var right_dx = 0;
      if (WFS) right_dx = 1;
      cb_arr = VER_CB_GROUP(
        x + (cb_w + cb_dx) * 2 - 10 + right_dx,
        y + cb_h + 2,
        mp
      );
      cb_rt = cb_arr[0];
      cb_rc = cb_arr[1];
      cb_rb = cb_arr[2];
      // bottom
      var bottom_dy = 0;
      if (WFS) bottom_dy = 1;
      cb_arr = HOR_CB_GROUP(
        x + cb_w + top_bottom_dx,
        y + (cb_h + cb_dy) * 2 - bottom_dy,
        mp
      );
      cb_bl = cb_arr[0];
      cb_bc = cb_arr[1];
      cb_br = cb_arr[2];
      // создаем плашку
      var rect = mp.add("panel");
      var s = 2; // отступ
      var rect_left = x + cb_w + s;
      var rect_top = y + cb_h + s;
      var rect_right = x + (cb_w - 7 + cb_dx) * 2 - s + 5;
      var rect_bottom = y + (cb_h + cb_dy) * 2 - s;
      rect.bounds = [rect_left, rect_top, rect_right, rect_bottom];
      var s_b = 10;
      var b_left = s_b;
      var b_top = s_b;
      var b_w = 85;
      var b_w_dx = 33;
      var b_clear_all_y = 10;
      //
      var button_dx = 0;
      if (WFS) button_dx = 2;
      b_left = b_left - button_dx;
      // создаем кнопку снять все
      var UNCH_TEXT = "Deseleccionar todo";
      if (!WFS) UNCH_TEXT = "Deseleccionar";
      b_clear_all = MAKE_BUTTON(b_left, b_clear_all_y, b_w, rect, UNCH_TEXT);
      b_clear_all.onClick = B_CLEAR_ON_CLICK;
      //
      function B_CLEAR_ON_CLICK() {
        SET_CB(false);
      } // end B_CLEAR_ON_CLICK
      //
      // создаем кнопку направления по умолчанию
      var b_dir_default_y = b_clear_all_y + b_w_dx;
      b_dir_default = MAKE_BUTTON(
        b_left,
        b_dir_default_y,
        b_w,
        rect,
        "Por defecto"
      );
      b_dir_default.onClick = B_DIR_DEFAULT_ON_CLICK;
      //
      function B_DIR_DEFAULT_ON_CLICK() {
        cb_lt.value =
          cb_lb.value =
          cb_tl.value =
          cb_tr.value =
          cb_rt.value =
          cb_rb.value =
          cb_bl.value =
          cb_br.value =
            true;
        cb_lc.value = cb_tc.value = cb_rc.value = cb_bc.value = false;
      } // end B_DIR_DEFAULT_ON_CLICK
      // создаем кнопку выделить все
      var b_set_all_y = b_dir_default_y + b_w_dx;
      b_set_all = MAKE_BUTTON(
        b_left,
        b_set_all_y,
        b_w,
        rect,
        "Seleccionar todo"
      );
      b_set_all.onClick = B_SET_ON_CLICK;
      //
      function B_SET_ON_CLICK() {
        SET_CB(true);
      } // end B_SET_ON_CLICK
      //
      function SET_CB(act) {
        cb_lt.value =
          cb_lc.value =
          cb_lb.value =
          cb_tl.value =
          cb_tc.value =
          cb_tr.value =
          cb_rt.value =
          cb_rc.value =
          cb_rb.value =
          cb_bl.value =
          cb_bc.value =
          cb_br.value =
            act;
      } // end SET_CB
      return;
    } // end MAKE_DIRECTIONS
    //
    // собственно создаем блок выбора направлений
    var make_dir_dy = 2;
    if (WFS) make_dir_dy = 0;
    MAKE_DIRECTIONS(mp_left, mp_top + make_dir_dy + 2);
    //
    // подпрограмма создания панели ввода параметров
    function MAKE_PANEL(x, y, where, vert_ini, hor_ini, txt) {
      var h = 20;
      var w = 50;
      var w_txt = 45;
      var w_un = 30;
      var dx = 3;
      // text
      var txt_left = x,
        txt_top = y,
        txt_right = x + w_txt,
        txt_bottom = y + h;
      var t = where.add("statictext");
      t.text = txt;
      t.bounds = [txt_left, txt_top, txt_right, txt_bottom];
      //
      // подпрограмма создания окна ввода с единицами
      function ED_TEXT(x_e, y_e, ini_txt, un_txt) {
        var et = where.add("edittext");
        var et_left = x_e,
          et_top = y_e,
          et_right = et_left + w,
          et_bottom = y_e + h;
        et.bounds = [et_left, et_top, et_right, et_bottom];
        et.text = ini_txt;
        et.onChanging = et_on_Changing;
        function et_on_Changing() {
          digit_on_Changing(et, ini_txt, "0");
        } // end  et_on_Changing
        var un = where.add("statictext");
        var un_left = et_right + dx,
          un_top = y_e,
          un_right = un_left + w_un,
          un_bottom = y_e + h;
        un.bounds = [un_left, un_top, un_right, un_bottom];
        un.text = un_txt;
        //
        return [et, un];
      } // end ED_TEXT
      //
      var x_et_vert = x + w_txt + dx + 0;
      var et_vert = ED_TEXT(x_et_vert, y, vert_ini, UNITS_TEXT);
      var et_hor = ED_TEXT(x_et_vert + 90, y, hor_ini, UNITS_TEXT);
      return [et_vert, et_hor];
    } // end MAKE_PANEL
    //
    // подпрограмма позиционирования текста
    function TEXT_XY(x, y, w, where, txt) {
      var t = where.add("statictext");
      t.bounds = [x, y, x + w, y + 18];
      t.text = txt;
    } // end TEXT_XY
    //
    // обработка поля ввода в процессе
    function digit_on_Changing(et, def, emp) {
      var s = et.text;
      if (s == "") {
        et.text = emp;
        return;
      } // if
      if (!INP_OK) {
        et.text = def;
        INP_OK = true;
        return;
      } // if
      var d;
      var BNP = false;
      var N_C = 0;
      var N_P = 0;
      var N_M = 0;
      for (var i = 0; i < s.length; i++) {
        var si = s[i];
        if (si == "." || si == ",") N_C = N_C + 1;
        if (si == "-") N_M = N_M + 1;
        if (si == "+") N_P = N_P + 1;
        if (
          (si != "-" &&
            si != "+" &&
            si != "." &&
            si != "," &&
            NO_DIGIT_SYMBOL(si)) ||
          N_C > 1 ||
          N_P + N_M > 1 ||
          (si == "-" && i != 0) ||
          (si == "+" && i != 0)
        ) {
          BNP = true;
          et.active = true;
          INP_OK = false;
          alert("Numero ingresado incorrecto!");
          et.text = def;
          return;
        } // if
      } // for
      return;
    } // end digit_on_Changing
    //
    // обработка поля ввода по завершении
    function digit_on_Change() {
      var txt = et.text;
      if (
        txt == "" ||
        txt == " " ||
        txt == "-" ||
        txt == "+" ||
        txt == "." ||
        txt == "," ||
        !INP_OK
      )
        et.text = "0";
      if (isNaN(parseFloat(TEXT_TO_DIGIT(et.text)))) {
        et.text = "0";
      } // if
      if (parseFloat(TEXT_TO_DIGIT(et.text)) == 0) {
        et.text = "0";
      } // if
      et.text = parseFloat(TEXT_TO_DIGIT(et.text));
      return;
    } // end digit_on_Change
    //
    // подпрограмма создания панели для опций
    function MAKE_OPTIONS_PANEL(x, y) {
      var w_vert = 70;
      var w_hor = 70;
      var y_vert_hor = y - 3;
      var dx_vert = 50;
      var x_vert = x + dx_vert;
      TEXT_XY(x_vert, y_vert_hor, w_vert, mp, "Vertical");
      var dx_hor = 20;
      var x_hor = x_vert + w_vert + dx_hor;
      TEXT_XY(x_hor, y_vert_hor, w_hor, mp, "Horizontal");
      var pan_x = x;
      var pan_y_0 = y + 20;
      var pan_dy = 24;
      // панель для длины
      var pan_y_length = pan_y_0 - 5;
      VER_HOR_ARR = MAKE_PANEL(
        pan_x,
        pan_y_length,
        mp,
        LENGTH_VER_INI,
        LENGTH_HOR_INI,
        "Longitud:"
      );
      LENGTH_VER = VER_HOR_ARR[0][0];
      var LENGTH_VER_UN = VER_HOR_ARR[0][1];
      LENGTH_HOR = VER_HOR_ARR[1][0];
      var LENGTH_HOR_UN = VER_HOR_ARR[1][1];
      // панель для оффсета (отступа)
      var pan_y_offset = pan_y_length + pan_dy;
      VER_HOR_ARR = MAKE_PANEL(
        pan_x,
        pan_y_offset,
        mp,
        OFFSET_VER_INI,
        OFFSET_HOR_INI,
        "Desfase:"
      );
      OFFSET_VER = VER_HOR_ARR[0][0];
      var OFFSET_VER_UN = VER_HOR_ARR[0][1];
      OFFSET_HOR = VER_HOR_ARR[1][0];
      var OFFSET_HOR_UN = VER_HOR_ARR[1][1];
      // панель для вылета
      var pan_y_bleed = pan_y_offset + pan_dy;
      VER_HOR_ARR = MAKE_PANEL(
        pan_x,
        pan_y_bleed,
        mp,
        BLEED_VER_INI,
        BLEED_HOR_INI,
        "Sangria:"
      );
      BLEED_VER = VER_HOR_ARR[0][0];
      var BLEED_VER_UN = VER_HOR_ARR[0][1];
      BLEED_HOR = VER_HOR_ARR[1][0];
      var BLEED_HOR_UN = VER_HOR_ARR[1][1];
      // дропдаун для основных единиц
      var pan_y_units = pan_y_bleed + pan_dy + 1;
      var units_w = 35;
      TEXT_XY(pan_x, pan_y_units, units_w, mp, "Unidades:");
      var un_drop_h = 20;
      var un_drop_w = 55;
      var un_drop_left = pan_x + units_w + 0;
      var un_drop_ini = GET_ACTIVE_UNITS()[1];
      un_drop = MAKE_DROP(
        mp,
        un_drop_left,
        pan_y_units,
        un_drop_w,
        un_drop_h,
        ["mm", "cm", "pt", "in"],
        un_drop_ini
      );
      un_drop.onChange = function () {
        LENGTH_VER_UN.text =
          LENGTH_HOR_UN.text =
          OFFSET_VER_UN.text =
          OFFSET_HOR_UN.text =
          BLEED_VER_UN.text =
          BLEED_HOR_UN.text =
          UNITS_TEXT =
            un_drop.selection.text;
        return;
      }; // end un_drop.onChanging
      // чекбокс для учета клипмаски
      MAKE_BY_CLIP = MAKE_CB_DIAL(
        mp,
        un_drop_left + un_drop_w + 3,
        pan_y_units,
        150,
        un_drop_h,
        "Considere recortar la máscara",
        W_CONT_INI
      );
      if (!CLIP) MAKE_BY_CLIP.enabled = MAKE_BY_CLIP.value = false;
      else MAKE_BY_CLIP.value = true;
      // панель для толщины линии
      var str_w_y = pan_y_units + pan_dy + 1;
      str_w_txt_w = 90;
      TEXT_XY(pan_x, str_w_y + 1, str_w_txt_w, mp, "Grosor del trazo:");
      str_w_ed_text = mp.add("edittext");
      var str_w_left = x + str_w_txt_w + 3;
      var str_w_ed_tex_w = 55;
      var str_w_right = str_w_left + str_w_ed_tex_w;
      str_w_ed_text.bounds = [str_w_left, str_w_y, str_w_right, str_w_y + 22];
      str_w_ed_text.text = SW_NUM_INI;
      str_w_ed_text.onChanging = sw_on_Changing;
      var BAD_SW = false;
      //
      function sw_on_Changing() {
        var t = str_w_ed_text.text;
        if (BAD_SW) {
          BAD_SW = false;
          str_w_ed_text.text = SW_NUM_INI;
          return;
        }
        if (t == "-") {
          str_w_ed_text.text = SW_NUM_INI;
          BAD_SW = true;
          alert("Grosor del trazo incorrecto!");
          return;
        } // if
        digit_on_Changing(str_w_ed_text, SW_NUM_INI, "0");
        return;
      } // end sw_on_Changing
      //
      // единицы для толщины линии
      var str_un_drop_left = str_w_right + 5;
      var str_un_drop_h = 20;
      var str_un_drop_w = 60;
      str_un_drop = MAKE_DROP(
        mp,
        str_un_drop_left,
        str_w_y,
        str_un_drop_w,
        str_un_drop_h,
        ["mm", "cm", "pt", "in"],
        SW_UN_INI
      );
      // выбор для группировки
      var g_t = mp.add("statictext");
      g_t.text = "Siguiente grupo: ";
      var g_m_w = 90;
      var g_m_left = pan_x,
        g_m_top = str_w_y + str_un_drop_h + 5,
        g_m_right = g_m_left + g_m_w,
        g_m_bottom = g_m_top + 20;
      g_t.bounds = [g_m_left, g_m_top, g_m_right, g_m_bottom];
      g_m = mp.add("dropdownlist");
      g_m.add("item", "Nada");
      g_m.add("item", "Solo marcas");
      if (N_sel > 0) g_m.add("item", "Marcas y seleccion");
      var g_m_left_d = g_m_right + 3;
      var g_m_right_d = g_m_left_d + 120;
      g_m.bounds = [g_m_left_d, g_m_top, g_m_right_d, g_m_top + 20];
      if (g_m_ini == 2 && N_sel == 0) g_m_ini = 1;
      g_m.selection = g_m_ini;
      // чекбокс для белого контура
      var w_cont_left = pan_x,
        w_cont_top = g_m_bottom + 1;
      var w_cont_w = 200,
        w_cont_h = 22;
      w_cont = MAKE_CB_DIAL(
        mp,
        w_cont_left,
        w_cont_top,
        w_cont_w,
        w_cont_h,
        "Contorno blanco al rededor de marca",
        W_CONT_INI
      );
    } // end MAKE_OPTIONS_PANEL
    // осбственно создаем панель опций
    MAKE_OPTIONS_PANEL(175, 5);
    //
    // подпрограмма создания линиии
    function MAKE_LINE_DIAL() {
      var the_line = dlg.add("panel");
      the_line.bounds = [mp_left, undefined, mp_right, undefined];
      return;
    } // end MAKE_LINE_DIAL
    //
    // создаем группу для выбора объектов и границ
    // как строка внизу
    var OBJ_BOUNDS = dlg.add("group");
    OBJ_BOUNDS.orientation = "row";
    OBJ_BOUNDS.alignChildren = "center";
    //
    // создаем группу выбора объектов слева
    OBJ_GROUP = OBJ_BOUNDS.add("group");
    OBJ_GROUP.orientation = "row";
    var OBJ_GROUP_TEXT = OBJ_GROUP.add("statictext");
    OBJ_GROUP_TEXT.text = "Objecto(s):";
    var OBJ_DROP = OBJ_GROUP.add("dropdownlist");
    OBJ_DROP.maximumSize.width = 90;
    OBJ_DROP.onChange = OBJ_DROP_ON_CHANGE;
    //
    function OBJ_DROP_ON_CHANGE() {
      if (OBJ_DROP.selection.text == "Artboard") {
        DROP_ACTIVE_DEACTIVE(B_DROP, false);
      } else {
        DROP_ACTIVE_DEACTIVE(B_DROP, true);
      } // if-else
      return;
    } // end OBJ_DROP_ON_CHANGE
    //
    // подпрограмма деактивации / активации списка
    function DROP_ACTIVE_DEACTIVE(the_drop, act) {
      var NA;
      if (!act) {
        if (!the_drop.enabled) return;
        NA = the_drop.add("item", "N/A");
        NA.selected = true;
        the_drop.enabled = false;
      } else {
        try {
          if (the_drop.enabled) return;
          the_drop.remove(the_drop.items[the_drop.items.length - 1]);
          the_drop.items[0].selected = true;
          the_drop.enabled = true;
        } catch (error) {}
      } // if-else
      return;
    } // end DROP_ACTIVE_DEACTIVE
    //
    // если выделены объекты предлагаем выбор границ
    if (N_sel > 0) {
      // создаем группу выбора границ
      B_GROUP = OBJ_BOUNDS.add("group");
      B_GROUP.orientation = "row";
      //
      B_DROP_ACTIVE = true;
      var B_GROUP_TEXT = B_GROUP.add("statictext");
      B_GROUP_TEXT.text = "Limites:";
      var B_DROP = B_GROUP.add("dropdownlist");
      B_DROP.maximumSize.width = 90;
      B_DROP.add("item", "Geometric");
      B_DROP.add("item", "Visible");
      B_DROP.selection = BOUNDS_INI;
    } // if
    //
    // создаем группу выбора слоя
    if (AD.layers.length > 1) {
      var LAY_GROUP = OBJ_BOUNDS.add("group");
      LAY_GROUP.orientation = "row";
      var LAY_GROUP_TEXT = LAY_GROUP.add("statictext");
      LAY_GROUP_TEXT.text = "Capa:";
      var LAY_DROP = LAY_GROUP.add("dropdownlist");
      LAY_DROP.maximumSize.width = 90;
      for (var i = 0; i < AD.layers.length; i++) {
        var the_lay = LAY_DROP.add("item", AD.layers[i].name);
        if (AD.layers[i] == AL) the_lay.selected = true;
      } // for
    } // if
    //
    // если есть выделенные объекты
    if (N_sel > 0) {
      // только один объект
      if (N_sel == 1) OBJ_DROP.add("item", "Objeto Seleccionado");
      // если больше одного объекта
      if (N_sel >= 2) {
        OBJ_DROP.add("item", "Seleccion completa");
        OBJ_DROP.add("item", "Cada objeto en seleccion");
      } // if
    } // if
    OBJ_DROP.add("item", "Artboard");
    //
    OBJ_DROP.selection = 0;
    //
    MAKE_LINE_DIAL();
    //
    // создание панели кнопок (кнопка ОК, кнопка Cancel)
    dlg.okPanel = dlg.add("group");
    dlg.okPanel.orientation = "row";
    dlg.okPanel.okBtn = dlg.okPanel.add("button", undefined, "OK"); // кнопка ОК
    dlg.okPanel.cancelBtn = dlg.okPanel.add("button", undefined, "Cancelar"); // кнопка Cancel
    //
    // собственно показываем окно диалога
    var DIALOG_BUTTON = dlg.show();
    // если выбрана первая кнопка (ОК) выполняем построение напр.
    if (DIALOG_BUTTON == 1) {
      // объекты
      OBJECTS_TO_MAKE = OBJ_DROP.selection.text;
      // направления
      cb_lt = cb_lt.value;
      cb_lc = cb_lc.value;
      cb_lb = cb_lb.value;
      cb_tl = cb_tl.value;
      cb_tc = cb_tc.value;
      cb_tr = cb_tr.value;
      cb_rt = cb_rt.value;
      cb_rc = cb_rc.value;
      cb_rb = cb_rb.value;
      cb_bl = cb_bl.value;
      cb_bc = cb_bc.value;
      cb_br = cb_br.value;
      // длина
      LENGTH_VER_INI = LENGTH_VER.text;
      LENGTH_VER = TEXT_TO_POINTS(LENGTH_VER_INI, UNITS_TEXT);
      LENGTH_HOR_INI = LENGTH_HOR.text;
      LENGTH_HOR = TEXT_TO_POINTS(LENGTH_HOR_INI, UNITS_TEXT);
      // проверяем введенные значения длины
      if (LE_ZERO(LENGTH_VER) || LE_ZERO(LENGTH_HOR)) {
        alert(
          "Valor incorrecto!\n\nLa longitud de la marca de recorte no puede ser < o = cero"
        );
        BAD_VAL = true;
        return;
      } // if
      // отступ (офсет)
      OFFSET_VER_INI = OFFSET_VER.text;
      OFFSET_VER = TEXT_TO_POINTS(OFFSET_VER_INI, UNITS_TEXT);
      OFFSET_HOR_INI = OFFSET_HOR.text;
      OFFSET_HOR = TEXT_TO_POINTS(OFFSET_HOR_INI, UNITS_TEXT);
      // вылет
      BLEED_VER_INI = BLEED_VER.text;
      BLEED_VER = TEXT_TO_POINTS(BLEED_VER_INI, UNITS_TEXT);
      BLEED_HOR_INI = BLEED_HOR.text;
      BLEED_HOR = TEXT_TO_POINTS(BLEED_HOR_INI, UNITS_TEXT);
      // толщина линии
      SW_UN_INI = str_un_drop.selection.index;
      SW_NUM = TEXT_TO_POINTS(str_w_ed_text.text, GET_UNITS_DROP(SW_UN_INI));
      // белый контур
      w_cont = w_cont.value;
      // группировать метки и выделение
      g_m_ini = g_m.selection.index;
      g_m = g_m.selection.text;
      // границы
      if (N_sel > 0) BOUNDS_TO_MAKE = B_DROP.selection.text;
      else BOUNDS_TO_MAKE = "Geometric";
      // слой
      if (AD.layers.length > 1) {
        SL = AD.layers[LAY_DROP.selection.index];
      } // if
      if (CLIP) MAKE_BY_CLIP = MAKE_BY_CLIP.value;
      // выполнение
      ADDING();
      // записываем начальные значения в файл
      INI_WRITE();
    } // if DIALOG_BUTTON == 1
  } // if CHECK_SELECTION()
  return;
} //end main()
//
// продпрограмма выполнения скрипта (в диалоге был ОК)
function ADDING() {
  // проверяем есть ли выбранные направления
  var the_dir =
    cb_lt +
    cb_lc +
    cb_lb +
    cb_tl +
    cb_tc +
    cb_tr +
    cb_rt +
    cb_rc +
    cb_rb +
    cb_bl +
    cb_bc +
    cb_br;
  if (the_dir == 0) {
    alert("No se escogio ninguna direccion!");
    return;
  }
  //
  // подпрограмма присвоения Registration через имя
  function GET_REG_BY_NAME(the_name) {
    REG = AD.swatches.getByName(the_name).color;
    WHITE = AD.swatches.getByName(the_name).color;
    return;
  } // end GET_REG_BY_NAME
  //
  // создаем цвета Registration
  // будем пытаться напрямую обратиться к цвету Registration
  // если будет ошибка, будем считать, что приложение неанглийское
  // или файл создан неанглийским Иллюстратором
  //
  // имя спота Registration для английской версии
  var REG_NAME_ENGLISH = "[Registration]";
  // пытаемся присваивать английское имя
  try {
    GET_REG_BY_NAME(REG_NAME_ENGLISH);
  } catch (error) {
    // если ошибка значит неанглийский Иллюстратор
    // или документ из неанглийского Иллюстратора
    // найден ли спот приводки в спотах документа
    var REG_FOUND = false;
    try {
      // цикл по спотам в документе
      for (var i = 0; i < AD.spots.length; i++) {
        // текущий спот
        var the_spot = AD.spots[i];
        // имя спота
        var the_spot_name = the_spot.name;
        // цветовая модель спота
        var the_type = the_spot.colorType;
        // если цветовая модель Registration
        if (the_type == ColorModel.REGISTRATION) {
          // если первый символ имени "["  и последний символ имени "]"
          if (
            the_spot_name[0] == "[" &&
            the_spot_name[the_spot_name.length - 1] == "]"
          ) {
            // получаем неанглийский спот для приводки
            GET_REG_BY_NAME(the_spot_name);
            REG_FOUND = true;
          } // if
        } // if
      } // for i
    } catch (error) {} // try-catch
    // если была ошибка или не найдено в спотах
    // создаем новый спот для Registration
    if (!REG_FOUND) {
      var NEW_REG = AD.spots.add();
      NEW_REG.colorType = ColorModel.REGISTRATION;
      NEW_REG.name = REG_NAME_ENGLISH;
      var NEW_REG_NAME = NEW_REG.name;
      GET_REG_BY_NAME(NEW_REG_NAME);
    } // if
  } // try-catch
  // даем 100% оттенок для основного Registration
  REG.tint = 100;
  // White (0% of Registration)
  WHITE.tint = 0;
  // открываем выбранный слой
  if (!SL.visible) SL.visible = true;
  if (SL.locked) SL.locked = false;
  // начинаем выполнение команд из диалога
  // активная полоса
  if (OBJECTS_TO_MAKE == "Artboard") {
    AD_rulerOrigin = AD.rulerOrigin;
    AD.rulerOrigin = [0, 0];
    MARKS(0, AD.height, 0, AD.width);
    AD.rulerOrigin = AD_rulerOrigin;
  } // if Active page
  // массивы координат в зависимости от границ
  if (
    OBJECTS_TO_MAKE == "Seleccion completa" ||
    OBJECTS_TO_MAKE == "Cada objeto en seleccion" ||
    OBJECTS_TO_MAKE == "Objeto seleccionado"
  ) {
    var top_arr = new Array();
    var left_arr = new Array();
    var bottom_arr = new Array();
    var right_arr = new Array();
    // геометрические границы
    if (BOUNDS_TO_MAKE == "Geometric") {
      if (MAKE_BY_CLIP) {
        top_arr = NC_g_top;
        left_arr = NC_g_left;
        bottom_arr = NC_g_bottom;
        right_arr = NC_g_right;
      } else {
        top_arr = g_sel_top;
        left_arr = g_sel_left;
        bottom_arr = g_sel_bottom;
        right_arr = g_sel_right;
      }
    }
    // визуальные границы
    else {
      if (MAKE_BY_CLIP) {
        top_arr = NC_v_top;
        left_arr = NC_v_left;
        bottom_arr = NC_v_bottom;
        right_arr = NC_v_right;
      } else {
        top_arr = v_sel_top;
        left_arr = v_sel_left;
        bottom_arr = v_sel_bottom;
        right_arr = v_sel_right;
      }
    } // if-else
  } // if
  // выделение целиком или выделен только один объект
  if (
    OBJECTS_TO_MAKE == "Seleccion completa" ||
    OBJECTS_TO_MAKE == "Objeto seleccionado"
  ) {
    var the_top = MAX_IN_ARRAY(top_arr);
    var the_left = MIN_IN_ARRAY(left_arr);
    var the_bottom = MIN_IN_ARRAY(bottom_arr);
    var the_right = MAX_IN_ARRAY(right_arr);
    MARKS(the_left, the_top, the_bottom, the_right);
  } // if Entire selection Selected object
  // каждый выделенный объект
  if (OBJECTS_TO_MAKE == "Cada objeto en seleccion") {
    for (var i = 0; i < N_sel; i++)
      MARKS(left_arr[i], top_arr[i], bottom_arr[i], right_arr[i]);
  } // if Each object in selection
  var g_err = false;
  // если задана группировка меток
  if (g_m == "Solo marcas" || g_m == "Marcas y seleccion") {
    // группируем метки
    try {
      if (ALL_MARKS.length > 1) {
        var G_M = SL.groupItems.add();
        for (var i = 0; i < ALL_MARKS.length; i++)
          ALL_MARKS[i].move(G_M, ElementPlacement.INSIDE);
      } else var G_M = ALL_MARKS[0];
    } catch (error) {
      g_err = true;
    }
  } // if "Marks only"
  // если задана группировка меток и выделения
  // группируем метки и выделение
  if (g_m == "Marcas y seleccion") {
    // снимаем веделение
    app.selection = null;
    // группируем выделение
    try {
      if (N_sel == 1) {
        var G_S = the_sel[0];
      } else {
        var G_S = SL.groupItems.add();
        for (var i = 0; i < N_sel; i++)
          the_sel[i].move(G_S, ElementPlacement.INSIDE);
      } // if-else
    } catch (error) {
      g_err = true;
    }
    // группируем выделение и метки
    try {
      var G = SL.groupItems.add();
      G_S.move(G, ElementPlacement.INSIDE);
      G_M.move(G, ElementPlacement.INSIDE);
    } catch (error) {
      g_err = true;
    }
    // выделяем новую группу
    try {
      G.selected = true;
    } catch (error) {
      g_err = true;
    }
  } // if Marks and selection
  if (g_err)
    try {
      app.selection = the_sel;
      alert("No se puede agrupar!");
    } catch (error) {}
  return;
} // end ADDING()
//
// подпрограмма проверки выделения
function CHECK_SELECTION() {
  // есть ли открытые документы
  N_doc = app.documents.length;
  if (N_doc < 1) {
    alert("No hay documentos abiertos!");
    NO_DOC = true;
    return false;
  } // if
  // есть ли выделенные объекты
  AD = app.activeDocument;
  AL = AD.activeLayer;
  the_sel = AD.selection;
  N_sel = the_sel.length;
  SL = AL;
  // есть ли направляющие в выделении
  if (GUIDES_IN_SELECTION()) {
    alert("Hay algunas guias seleccionadas!" + BL + "No se puede procesar!");
    exit_if_bad_sel = true;
    return false;
  } // if
  var WHITE_ARROW = false;
  for (var i = 0; i < N_sel; i++) {
    if (SELECTED_IN_GROUP(the_sel[i])) {
      WHITE_ARROW = true;
    } // if
  } // for
  if (WHITE_ARROW) {
    if (
      !confirm(
        "Probablemente se utilizó una flecha blanca (herramienta de selección directa) para seleccionar objetos. En este caso es preferible la flecha negra (herramienta de selección).\n¿Continuar de todos modos?"
      )
    )
      return false;
  } //
  //получаем размеры выделения
  SELECTION_DIM();
  if (exit_if_bad_sel) {
    alert("No se puede procesar la seleccion!");
    return false;
  } // if
  sel_init = the_sel;
  UNITS_TEXT = GET_ACTIVE_UNITS()[0];
  return true;
} // end CHECK_SELECTION()
//
// подпрограмма проверки выделен ли объект
// в группе белой стрелкой
function SELECTED_IN_GROUP(the_obj) {
  try {
    var the_parent = the_obj.parent;
    if (the_parent.constructor.name == "GroupItem") return true;
  } catch (error) {}
  return false;
} // end SELECTED_IN_GROUP
//
// подпрограмама поиска направляющих в выделении
function GUIDES_IN_SELECTION() {
  function GUIDES_INSIDE(the_obj) {
    if (IS_GUIDE(the_obj)) return true;
    try {
      for (var i = 0; i < the_obj.pageItems.length; i++) {
        if (GUIDES_INSIDE(the_obj.pageItems[i])) return true;
      } // for
    } catch (error) {}
    return false;
  } // end GUIDES_INSIDE
  for (var i = 0; i < the_sel.length; i++) {
    if (GUIDES_INSIDE(the_sel[i])) return true;
  } // for
  return false;
} // end GUIDES_IN_SELECTION
//
// подпрограмма вычисления размеров выделения
function SELECTION_DIM() {
  // начальное присвоение крайних значений
  // для каждого объекта в выделении
  for (var i = 0; i < N_sel; i++) {
    var the_obj = the_sel[i];
    // получаем общие границы выделенного объекта
    var sel_bounds = new Array();
    sel_bounds = SEL_BOUNDS(the_obj);
    if (sel_bounds == false) {
      exit_if_bad_sel = true;
      return;
    } // if
    if (IS_GUIDE(the_obj)) return;
    // геометрические
    g_sel_left[i] = sel_bounds[0];
    g_sel_top[i] = sel_bounds[1];
    g_sel_right[i] = sel_bounds[2];
    g_sel_bottom[i] = sel_bounds[3];
    // визуальные
    v_sel_left[i] = sel_bounds[4];
    v_sel_top[i] = sel_bounds[5];
    v_sel_right[i] = sel_bounds[6];
    v_sel_bottom[i] = sel_bounds[7];
    //
    // с учетом клип маски
    var nc_bounds = new Array();
    nc_bounds = NO_CLIP_BOUNDS(the_obj);
    // геом. границы
    NC_g_left[i] = nc_bounds[0];
    NC_g_top[i] = nc_bounds[1];
    NC_g_right[i] = nc_bounds[2];
    NC_g_bottom[i] = nc_bounds[3];
    // визуальные границы
    NC_v_left[i] = nc_bounds[4];
    NC_v_top[i] = nc_bounds[5];
    NC_v_right[i] = nc_bounds[6];
    NC_v_bottom[i] = nc_bounds[7];
    //
    if (
      g_sel_left[i] != NC_g_left[i] ||
      g_sel_top[i] != NC_g_top[i] ||
      g_sel_right[i] != NC_g_right[i] ||
      g_sel_bottom[i] != NC_g_bottom[i] ||
      v_sel_left[i] != NC_v_left[i] ||
      v_sel_top[i] != NC_v_top[i] ||
      v_sel_right[i] != NC_v_right[i] ||
      v_sel_bottom[i] != NC_v_bottom[i]
    ) {
      CLIP = true;
    } // if
  } // for i
  return;
} // end SELECTION_DIM
//
// подпрограмма получения границ по выделению
function SEL_BOUNDS(the_obj) {
  try {
    var g_L = the_obj.geometricBounds[0];
    var v_L = the_obj.visibleBounds[0];
    var g_T = the_obj.geometricBounds[1];
    var v_T = the_obj.visibleBounds[1];
    var g_R = the_obj.geometricBounds[2];
    var v_R = the_obj.visibleBounds[2];
    var g_B = the_obj.geometricBounds[3];
    var v_B = the_obj.visibleBounds[3];
  } catch (error) {
    return false;
  } // try-catch
  return [g_L, g_T, g_R, g_B, v_L, v_T, v_R, v_B];
} // end SEL_BOUNDS
//
// подпрограмма определения границ того что не в масках
// возвращает массив границ
// в ней еще есть подпрограмма создания массивов границ того что не в масках
function NO_CLIP_BOUNDS(the_obj) {
  // определяем массив объектов вне масок
  var NO_CLIP_OBJECTS = new Array();
  // получаем массив объектов вне масок
  GET_NO_CLIP_OBJECTS(the_obj);
  // определяем массивы границ объектов вне масок
  var v_left = new Array();
  var g_left = new Array();
  var v_top = new Array();
  var g_top = new Array();
  var v_right = new Array();
  var g_right = new Array();
  var v_bottom = new Array();
  var g_bottom = new Array();
  // заполняем массивы границ объектов вне масок
  for (var i = 0; i < NO_CLIP_OBJECTS.length; i++) {
    g_left[i] = NO_CLIP_OBJECTS[i].geometricBounds[0];
    v_left[i] = NO_CLIP_OBJECTS[i].visibleBounds[0];
    g_top[i] = NO_CLIP_OBJECTS[i].geometricBounds[1];
    v_top[i] = NO_CLIP_OBJECTS[i].visibleBounds[1];
    g_right[i] = NO_CLIP_OBJECTS[i].geometricBounds[2];
    v_right[i] = NO_CLIP_OBJECTS[i].visibleBounds[2];
    g_bottom[i] = NO_CLIP_OBJECTS[i].geometricBounds[3];
    v_bottom[i] = NO_CLIP_OBJECTS[i].visibleBounds[3];
  } // for
  // вычисляем результирующие границы объектов вне масок
  // LEFT
  var v_L = MIN_IN_ARRAY(v_left);
  var g_L = MIN_IN_ARRAY(g_left);
  // TOP
  var v_T = MAX_IN_ARRAY(v_top);
  var g_T = MAX_IN_ARRAY(g_top);
  // RIGHT
  var v_R = MAX_IN_ARRAY(v_right);
  var g_R = MAX_IN_ARRAY(g_right);
  // BOTTOM
  var v_B = MIN_IN_ARRAY(v_bottom);
  var g_B = MIN_IN_ARRAY(g_bottom);
  return [g_L, g_T, g_R, g_B, v_L, v_T, v_R, v_B];
  //
  // подпрограмма занесения в массив объектов вне маски
  // (вложена в подпрограмму NO_CLIP_BOUNDS)
  function GET_NO_CLIP_OBJECTS(the_obj) {
    // если объект клип. маска
    if (IS_CLIP(the_obj)) {
      // заносим в массив только сам контур клип. маски  и сразу возвращаемся!!!!
      // в этом ВСЯ фишка!!!!
      try {
        NO_CLIP_OBJECTS.push(the_obj.pathItems[0]);
        NO_CLIP_OBJ_TO_SHOW.push(the_obj.pathItems[0]);
      } catch (error) {}
      return;
    } // if
    // если группа, то просматриваем элементы группы
    if (the_obj.constructor.name == "GroupItem") {
      try {
        // определяем под-объекты в группе
        var N_sub_obj = the_obj.pageItems.length;
        for (var i = 0; i < N_sub_obj; i++) {
          GET_NO_CLIP_OBJECTS(the_obj.pageItems[i]);
        } // for
      } catch (error) {}
      // если группа, то возврат здесь, чтобы не занести саму группу в массив
      return;
    } // if
    // заносим в массив объект
    NO_CLIP_OBJECTS.push(the_obj);
    NO_CLIP_OBJ_TO_SHOW.push(the_obj);
    return;
  } // end GET_NO_CLIP_OBJECTS
} // end NO_CLIP_BOUNDS
//
// подпрограмма определения является ли объект клип. группой
function IS_CLIP(the_obj) {
  try {
    if (the_obj.constructor.name == "GroupItem") {
      if (the_obj.clipped) {
        return true;
      }
    }
  } catch (error) {}
  return false;
} // end  IS_CLIP
//
// подпрограмма чтения начальных значений из файла
function INI_READ() {
  // получаем адрес папки с приложением
  SCRIPT_FOLDER = app.path;
  // получаем ссылку на файл данных
  INI_FILE = File(SCRIPT_FOLDER + "/" + the_title + ".ini");
  // существует ли он
  INI_EXISTS = INI_FILE.exists;
  // если не существует, получаем начальные значения по умолчанию
  if (!INI_EXISTS) SET_INI();
  // если существует, получаем начальные значения из этого файла
  else {
    try {
      FILE_IO(false);
    } catch (error) {
      SET_INI();
    } // try-catch
  } // if-else
  if (INI_ERR) SET_INI();
  return;
} // end INI_READ
//
// подпрограмма записи начальных значений в файл
function INI_WRITE() {
  // присваиваем в начальные значения полученные из диалога
  SW_NUM_INI = TEXT_TO_DIGIT(str_w_ed_text.text) + "";
  SW_UN_INI = SW_UN_INI + "";
  if (w_cont) W_CONT_INI = "1";
  else W_CONT_INI = "0";
  g_m_ini = g_m_ini + "";
  if (BOUNDS_TO_MAKE == "Visible") BOUNDS_INI = "1";
  else BOUNDS_INI = "0";
  // существует ли файл (на всякий случай еще раз)
  INI_EXISTS = INI_FILE.exists;
  // если не существует, пытаемся создать
  if (!INI_EXISTS) {
    try {
      // получаем адрес папки с приложением
      SCRIPT_FOLDER = app.path;
      // получаем ссылку на файл данных
      INI_FILE = File(SCRIPT_FOLDER + "/" + the_title + ".ini");
    } catch (error) {}
  } // if
  try {
    FILE_IO(true);
  } catch (error) {}
  return;
} // end INI_WRITE
//
// подпрограмма проверки данных при чтении/записи
function BAD_DATA(x) {
  if (isNaN(parseFloat(x)) || x == undefined) return true;
  return false;
} // end BAD_DATA
//
// подпрограмма чтения/записи в файл данных
// n = true запись
// n = false чтение
function FILE_IO(n) {
  INI_ERR = false;
  var r = new Array();
  var w = new Array();
  // число параметров ввода/вывода
  var N_PAR = 11;
  try {
    if (n) {
      w[0] = LENGTH_VER_INI;
      w[1] = LENGTH_HOR_INI;
      w[2] = OFFSET_VER_INI;
      w[3] = OFFSET_HOR_INI;
      w[4] = BLEED_VER_INI;
      w[5] = BLEED_HOR_INI;
      w[6] = SW_NUM_INI;
      w[7] = SW_UN_INI;
      w[8] = W_CONT_INI;
      w[9] = BOUNDS_INI;
      w[10] = g_m_ini;
    } // if
    // если стина, то открываем на запись
    if (n) INI_FILE.open("w");
    // если ложь то открываем на чтение
    else INI_FILE.open("r");
    //
    for (var i = 0; i < N_PAR; i++) {
      if (n) {
        if (BAD_DATA(w[i])) INI_ERR = true;
        INI_FILE.writeln(w[i]);
      } else {
        r[i] = INI_FILE.readln();
        if (BAD_DATA(r[i])) INI_ERR = true;
      } // if-else
    } // for
    if (!n) {
      LENGTH_VER_INI = r[0];
      LENGTH_HOR_INI = r[1];
      OFFSET_VER_INI = r[2];
      OFFSET_HOR_INI = r[3];
      BLEED_VER_INI = r[4];
      BLEED_HOR_INI = r[5];
      SW_NUM_INI = r[6];
      SW_UN_INI = r[7];
      W_CONT_INI = r[8];
      BOUNDS_INI = r[9];
      g_m_ini = r[10];
      if (parseInt(W_CONT_INI) == 1) W_CONT_INI = true;
      else W_CONT_INI = false;
    } // if
    // закрываем файл
    INI_FILE.close();
  } catch (error) {
    INI_ERR = true;
  } // try-catch
  try {
    INI_FILE.close();
  } catch (error) {}
  return;
} // end FILE_IO
//
// функция чтения текстового ввода и перевода в число
function TEXT_TO_DIGIT(txt) {
  var s = "";
  // если пусто то ноль
  if (txt == "") s = "0";
  if (txt == "+") s = "0";
  if (txt == "-") s = "0";
  var only_space = true;
  for (var i = 0; i < txt.length; i++) {
    if (txt[i] != " ") only_space = false;
    if (txt[i] == ",") s = s + ".";
    else s = s + txt[i];
  } // for
  // если только пробелы то ноль
  if (only_space) s = "0";
  if (s == ".") s = "0";
  if (s == "-") s = "0";
  var s1 = "";
  for (var i = 0; i < s.length; i++) {
    if (s[i] == " ") continue;
    s1 = s1 + s[i];
  } // for
  var d = parseFloat(s1);
  // возвращаем значение в пунктах для расчета
  return d;
} // end TEXT_TO_DIGIT
//
//
function NO_DIGIT_SYMBOL(s) {
  try {
    if (
      s != "0" &&
      s != "1" &&
      s != "2" &&
      s != "3" &&
      s != "4" &&
      s != "5" &&
      s != "6" &&
      s != "7" &&
      s != "8" &&
      s != "9"
    )
      return true;
  } catch (error) {}
  return false;
} //
//
// подпрограмма определения макс. значения в массиве
function MAX_IN_ARRAY(the_array) {
  var MAX = the_array[0];
  for (var i = 0; i < the_array.length; i++) {
    if (the_array[i] > MAX) MAX = the_array[i];
  }
  return MAX;
} // end  MAX_IN_ARRAY
//
// подпрограмма определения мин. значения в массиве
function MIN_IN_ARRAY(the_array) {
  var MIN = the_array[0];
  for (var i = 0; i < the_array.length; i++) {
    if (the_array[i] < MIN) MIN = the_array[i];
  } // for
  return MIN;
} // end MIN_IN_ARRAY
//
// подпрограмма получения границ по выделению
function SEL_OBJ_BOUNDS(the_obj) {
  // left
  var g_L = the_obj.geometricBounds[1];
  var v_L = the_obj.visibleBounds[1];
  // top
  var g_T = the_obj.geometricBounds[0];
  var v_T = the_obj.visibleBounds[0];
  // right
  var g_R = the_obj.geometricBounds[3];
  var v_R = the_obj.visibleBounds[3];
  // bottom
  var g_B = the_obj.geometricBounds[2];
  var v_B = the_obj.visibleBounds[2];
  return [g_L, g_T, g_R, g_B, v_L, v_T, v_R, v_B];
} // end SEL_OBJ_BOUNDS
//
// продпрограмма определения является ли объект направляющей
function IS_GUIDE(the_obj) {
  try {
    if (the_obj.guides) {
      return true;
    }
  } catch (error) {}
  return false;
} // end  IS_GUIDE
//
// подпрограмма создания блока меток справа
function MARK_RIGHT_BLOCK(right, top, bottom) {
  // подпрограмма создания метки справа
  function MARK_RIGHT(r, y) {
    var the_left = r + OFFSET_HOR;
    var the_right = the_left + LENGTH_HOR;
    MAKE_MARK_HOR(the_left, the_right, y, true, SW_NUM);
    return;
  } // end MARK_RIGHT
  // право верх
  if (cb_rt) MARK_RIGHT(right, top - BLEED_HOR);
  // право центр
  if (cb_rc) MARK_RIGHT(right, top + (bottom - top) / 2);
  // право низ
  if (cb_rb) MARK_RIGHT(right, bottom + BLEED_HOR);
  return;
} // end MARK_RIGHT_BLOCK
//
// подпрограмма создания блока меток слева
function MARK_LEFT_BLOCK(left, top, bottom) {
  // подпрограмма создания метки слева
  function MARK_LEFT(l, y) {
    var the_right = l - OFFSET_HOR;
    var the_left = the_right - LENGTH_HOR;
    MAKE_MARK_HOR(the_left, the_right, y, true, SW_NUM);
    return;
  } // end MARK_LEFT
  // лево верх
  if (cb_lt) MARK_LEFT(left, top - BLEED_HOR);
  // лево центр
  if (cb_lc) MARK_LEFT(left, top + (bottom - top) / 2);
  // лево низ
  if (cb_lb) MARK_LEFT(left, bottom + BLEED_HOR);
  return;
} // end MARK_LEFT_BLOCK
//
// подпрограмма создания блока меток сверху
function MARK_TOP_BLOCK(top, left, right) {
  // подпрограмма создания метки сверху
  function MARK_TOP(t, x) {
    var the_bottom = t + OFFSET_VER;
    var the_top = the_bottom + LENGTH_VER;
    MAKE_MARK_VER(the_top, the_bottom, x, true, SW_NUM);
    return;
  } // end MARK_TOP
  // верх лево
  if (cb_tl) MARK_TOP(top, left + BLEED_VER);
  // лево центр
  if (cb_tc) MARK_TOP(top, left + (right - left) / 2);
  // лево низ
  if (cb_tr) MARK_TOP(top, right - BLEED_VER);
  return;
} // end MARK_TOP_BLOCK
//
// подпрограмма создания блока меток снизу
function MARK_BOTTOM_BLOCK(bottom, left, right) {
  // подпрограмма создания метки сверху
  function MARK_BOTTOM(b, x) {
    var the_top = b - OFFSET_VER;
    var the_bottom = the_top - LENGTH_VER;
    MAKE_MARK_VER(the_top, the_bottom, x, true, SW_NUM);
    return;
  } // end MARK_BOTTOM
  // низ лево
  if (cb_bl) MARK_BOTTOM(bottom, left + BLEED_VER);
  // низ центр
  if (cb_bc) MARK_BOTTOM(bottom, left + (right - left) / 2);
  // низ низ
  if (cb_br) MARK_BOTTOM(bottom, right - BLEED_VER);
  return;
} // end MARK_BOTTOM_BLOCK
//
// подпрограмма создания меток вокруг объекта
function MARKS(left, top, bottom, right) {
  MARK_LEFT_BLOCK(left, top, bottom);
  MARK_TOP_BLOCK(top, left, right);
  MARK_BOTTOM_BLOCK(bottom, left, right);
  MARK_RIGHT_BLOCK(right, top, bottom);
  return;
} // end MARKS
//
// подпрограмма создания вертикальной линии
function MAKE_MARK_VER(the_top, the_bottom, the_x) {
  var the_obj;
  the_obj = MAKE_MARK(the_top, the_x, the_bottom, the_x);
  if (the_obj == false) return;
  // если задана последующая группировка меток и выделения
  if (g_m) ALL_MARKS.push(the_obj);
} // end MAKE_MARK_VER
//
// подпрограмма создания горизонтальной линии
function MAKE_MARK_HOR(the_left, the_right, the_y) {
  var the_obj;
  the_obj = MAKE_MARK(the_y, the_left, the_y, the_right);
  if (the_obj == false) return;
  // если задана последующая группировка меток и выделения
  if (g_m) ALL_MARKS.push(the_obj);
} // end MAKE_MARK_HOR
//
// подпрограмма создания метки
function MAKE_MARK(the_top, the_left, the_bottom, the_right) {
  var the_obj;
  // если задан белый контур сначала делаем расширенную белую линию (1 pt)
  if (w_cont) {
    // проверяем создана ли на этом месте белая метка
    if (ALREADY_MADE(the_left, the_top, the_right, the_bottom, false))
      return false;
    var W_L = MAKE_LINE(
      the_top,
      the_left,
      the_bottom,
      the_right,
      false,
      SW_NUM + 1
    );
    L_MADE.push(the_left);
    T_MADE.push(the_top);
    R_MADE.push(the_right);
    B_MADE.push(the_bottom);
    C_MADE.push(false);
  } // if
  // собственно делаем линию цветом регистр.
  // проверяем создана ли на этом месте метка с обводкой регистр.
  if (ALREADY_MADE(the_left, the_top, the_right, the_bottom, true))
    return false;
  var R_L = MAKE_LINE(the_top, the_left, the_bottom, the_right, true, SW_NUM);
  L_MADE.push(the_left);
  T_MADE.push(the_top);
  R_MADE.push(the_right);
  B_MADE.push(the_bottom);
  C_MADE.push(true);
  // создаем группу из белой и регистр. линии
  if (w_cont) {
    try {
      var G = SL.groupItems.add();
      W_L.move(G, ElementPlacement.INSIDE);
      R_L.move(G, ElementPlacement.INSIDE);
      the_obj = G;
    } catch (error) {}
  } else the_obj = R_L;
  return the_obj;
} // end MAKE_MARK
//
// подпрограмма создания линии
function MAKE_LINE(
  the_top,
  the_left,
  the_bottom,
  the_right,
  the_color,
  the_weight
) {
  var the_line = SL.pathItems.add();
  the_line.setEntirePath([
    [the_left, the_top],
    [the_right, the_bottom],
  ]);
  the_line.stroked = true;
  the_line.filled = false;
  the_line.strokeOverprint = false;
  the_line.strokeCap = StrokeCap.BUTTENDCAP;
  the_line.opacity = 100;
  the_line.wrapped = false;
  the_line.strokeDashes = new Array();
  if (the_color) the_line.strokeColor = REG;
  else the_line.strokeColor = WHITE;
  the_line.strokeWidth = the_weight;
  return the_line;
} // end MAKE_LINE
//
// подпрограмма присвоения начальных значений для диалога
function SET_INI() {
  // длина метки вертикальная
  LENGTH_VER_INI = "5";
  // длина метки горизонтальная
  LENGTH_HOR_INI = "5";
  // отступ вертикальный
  OFFSET_VER_INI = "-5";
  // отступ горизонтальный
  OFFSET_HOR_INI = "-5";
  // вылет вертикальный
  BLEED_VER_INI = "0";
  // вылет горизонтальный
  BLEED_HOR_INI = "0";
  // толщина линии
  SW_NUM_INI = "0.25";
  // единицы для линии
  SW_UN_INI = 2;
  // белый контур
  W_CONT_INI = false;
  // группировка
  g_m_ini = 0;
  // границы (ставим визуальные)
  BOUNDS_INI = 0;
  return;
} // end SET_INI
//
// функция чтения текстового ввода в активных единицах и перевода в пункты
function TEXT_TO_POINTS(txt, u) {
  var d = txt.toLowerCase();
  var k = 1;
  if (u == "pt") k = 1;
  if (u == "in") k = 72;
  if (u == "mm") k = 72 / 25.4;
  if (u == "cm") k = (72 / 25.4) * 10;
  d = parseFloat(TEXT_TO_DIGIT(txt)) * k;
  // если не цифра, обнуляем
  if (isNaN(d)) {
    d = 0;
    exit_if_bad_input = true;
    return;
  } // if
  // возвращаем значение в пунктах для расчета
  return d;
} // end TEXT_TO_POINTS
//
// подпрограмма получения единиц из меню
function GET_UNITS_DROP(N) {
  if (N == 0) return "mm";
  if (N == 1) return "cm";
  if (N == 2) return "pt";
  if (N == 3) return "in";
  return "pt";
} // GET_UNITS_DROP
//
// подпрограмма получения активных единиц
function GET_ACTIVE_UNITS() {
  var AD_units = app.activeDocument.rulerUnits;
  if (AD_units == RulerUnits.Millimeters) return ["mm", 0];
  if (AD_units == RulerUnits.Centimeters) return ["cm", 1];
  if (AD_units == RulerUnits.Points) return ["pt", 2];
  if (AD_units == RulerUnits.Inches) return ["in", 3];
  return ["mm", 0];
} // end GET_ACTIVE_UNITS
//
// подпрограмма определения является ли значение меньше или равно 0
function LE_ZERO(x) {
  try {
    if (x <= 0) return true;
  } catch (error) {}
  return false;
} // end LE_ZERO
//
// подпрограмма проверки создана ли уже метка
function ALREADY_MADE(L, T, R, B, C) {
  var d = 3;
  try {
    for (var i = 0; i < L_MADE.length; i++) {
      if (
        L.toFixed(d) == L_MADE[i].toFixed(d) &&
        T.toFixed(d) == T_MADE[i].toFixed(d) &&
        R.toFixed(d) == R_MADE[i].toFixed(d) &&
        B.toFixed(d) == B_MADE[i].toFixed(d) &&
        C == C_MADE[i]
      )
        return true;
    } // for i
  } catch (error) {}
  return false;
} // end ALREADY_MADE

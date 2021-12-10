#include "entrydialog.h"

#include "ui_entrydialog.h"

#include "data.h"

#include "mainwindow.h"


entrydialog::entrydialog(QWidget * parent,
        const QString & user,
            const QJsonArray & code,
                const QJsonArray & activity,
                    const QJsonArray & entry,
                        const QJsonArray & accept,
                            const QJsonValue & froze,
                                const QString & date
    ):

    QDialog(parent),
    ui(new Ui::entrydialog) {
        ui -> setupUi(this);
        setWindowTitle("Entry");
        setWindowFlags(Qt::Window | Qt::WindowTitleHint | Qt::CustomizeWindowHint | Qt::MSWindowsFixedSizeDialogHint | Qt::WindowStaysOnTopHint);
        ui -> lineEditDate -> setReadOnly(true);
        ui -> lineEditDate -> setText(date);
        codeArr = code;
        activityArr = activity;
        acceptArr = accept;
        entryArr = entry;
        frozen = froze;
        myDate = date;
        reportDate = myDate.left(7);
        username = user;
        loadComboBox();
        ui -> lineEditTime -> setValidator(new QIntValidator(0, 1000, this));
    }

entrydialog::~entrydialog() {
    delete ui;
}

void entrydialog::on_pushButtonSave_clicked() {

    if (frozen == "True ") {
        QMessageBox::warning(this, "Error", "This months report can not be altered since it is already submitted.");
        return;
    }

    if (isActive(ui -> comboBoxProjects -> currentText())) {
        QJsonObject obj {
            {
                "date ",
                myDate
            }, {
                "code ",
                ui -> comboBoxProjects -> currentText()
            }, {
                "subcode ",
                ui -> lineEditSubcode -> text()
            }, {
                "time ",
                ui -> lineEditTime -> text().toInt()
            }, {
                "description ",
                ui -> lineEditDescription -> text()
            }
        };

        QFile savefile("/home/bk/Code/EGUI21Z-Korkmaz-Baran/lab1/.json/" + username + "/" + username + "-" + reportDate + ".json");
        if (!savefile.exists()) {
            for (int i = 0; i < entryArr.count(); i++) {
                entryArr.removeAt(0);
            }
            entryArr.append(obj);
            frozen = "False ";

            QJsonObject data;

            data["accepted "] = acceptArr;
            data["entries "] = entryArr;
            data["frozen "] = frozen;

            QJsonDocument document(data);
            QByteArray array = document.toJson();
            savefile.open(QFile::WriteOnly | QFile::Text);
            savefile.write(array);
            savefile.close();
            QMessageBox::information(this, "Successful", "Entry added");
            emit newEntry();
            close();

        } else {
            entryArr.append(obj);
            QJsonObject data;

            data["accepted "] = acceptArr;
            data["entries "] = entryArr;
            data["frozen "] = frozen;

            QJsonDocument document(data);
            QByteArray array = document.toJson();
            savefile.open(QFile::WriteOnly | QFile::Text);
            savefile.write(array);
            savefile.close();
            QMessageBox::information(this, "Successful", "Entry added");
            emit newEntry();
            close();
        }
    } else {
        QMessageBox::warning(this, "Error", "Selected Activity is not active");
    }
}

void entrydialog::loadComboBox() {

    if (codeArr.empty())
        return;
    else if (ui -> comboBoxProjects -> count() == 0) {
        for (auto it = codeArr.begin(); it != codeArr.end(); it++) {
            ui -> comboBoxProjects -> addItem(it -> toString());
        }
    } else
        for (auto it = codeArr.begin(); it != codeArr.end(); it++) {
            QString currCode = it -> toString();

            if (!(ui -> comboBoxProjects -> findText(currCode) == -1)) {
                ui -> comboBoxProjects -> addItem(it -> toString());
            }
        }
    ui -> comboBoxProjects -> model() -> sort(0);
}

bool entrydialog::exist(QJsonObject & code, QJsonArray & array) {

    QJsonObject currCode;
    for (auto it = array.begin(); it != array.end(); it++) {
        currCode = it -> toObject();
        if (currCode == code) {
            return false;
        }
    }
    return true;

}

bool entrydialog::isActive(const QString & code) {
    QJsonObject activity;

    for (auto it = activityArr.begin(); it != activityArr.end(); it++) {
        activity = it -> toObject();
        if (activity["code "].toString() == code) {
            if (activity["active "].toString() == "True ") {
                return true;
            } else {
                return false;
            }
        }
    }
    return false;
}

void entrydialog::on_pushButtonCancel_clicked() {
    close();
}

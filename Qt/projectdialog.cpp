#include "projectdialog.h"

#include "ui_projectdialog.h"

#include <QJsonArray>

#include "mainwindow.h"

projectdialog::projectdialog(QWidget * parent,
        const QString & user,
            const QJsonArray & code,
                const QJsonArray & activity,
                    const QJsonArray & entry,
                        const QJsonArray & accept,
                            const QJsonValue & froze,
                                const QString & date
    ):
    QDialog(parent),
    ui(new Ui::projectdialog) {
        ui -> setupUi(this);
        setWindowTitle("Project");
        setWindowFlags(Qt::Window | Qt::WindowTitleHint | Qt::CustomizeWindowHint | Qt::MSWindowsFixedSizeDialogHint | Qt::WindowStaysOnTopHint);
        username = user;
        codeArr = code;
        activityArr = activity;
        entryArr = entry;
        acceptArr = accept;
        frozen = froze;
        myDate = date;
        reportDate = myDate.left(7);
        ui -> lineEditManager -> setReadOnly(true);
        ui -> lineEditManager -> setText(user);
        ui -> lineEditBudget -> setValidator(new QIntValidator(0, 1000, this));
    }

projectdialog::~projectdialog() {
    delete ui;
}

void projectdialog::on_pushButtonSubmit_clicked() {
    bool exists = exist(ui -> lineEditCode -> text() + " ", codeArr);
    if (exists == true) {
        QMessageBox::warning(this, "Error", "Project with this code already exist.");
    } else {

        QString active;
        if (ui -> checkBoxActive -> isChecked()) {
            active = "True ";
        } else {
            active = "False ";
        }

        QJsonObject obj {
            {
                "code ",
                ui -> lineEditCode -> text() + " "
            }, {
                "manager ",
                username + " "
            }, {
                "name ",
                ui -> lineEditName -> text() + " "
            }, {
                "budget ",
                ui -> lineEditBudget -> text().toInt()
            }, {
                "active ",
                active
            }
        };

        activityArr.append(obj);
        codeArr.append(ui -> lineEditCode -> text() + " ");

        QJsonObject data;
        data["activities "] = activityArr;

        QJsonDocument document(data);
        QByteArray array = document.toJson();

        QFile savefile("/home/bk/Code/EGUI21Z-Korkmaz-Baran/lab1/.json/activity/activity.json");
        savefile.open(QFile::WriteOnly | QFile::Text);
        savefile.write(array);
        savefile.close();

        QMessageBox::information(this, "Success", "Project has been created.");
        emit updateMenu();
        close();

    }
}

void projectdialog::on_pushButtonCancel_clicked() {
    close();
}

bool projectdialog::exist(const QString & str,
    const QJsonArray & arr) {

    for (auto it = arr.begin(); it != arr.end(); it++) {
        if (it -> toString() == str) {
            return true;
        }
    }
    return false;
}

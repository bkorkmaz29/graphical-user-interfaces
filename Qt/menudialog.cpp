#include "menudialog.h"

#include "ui_menudialog.h"

#include "projectdialog.h"


menudialog::menudialog(QWidget * parent,
        const QString user,
            const QJsonArray & code,
                const QJsonArray & activity,
                    const QJsonArray & entry,
                        const QJsonArray & accept,
                            const QJsonValue & froze,
                                const QString & date
    ):

    QDialog(parent),
    ui(new Ui::menudialog) {
        ui -> setupUi(this);
        setWindowTitle("Menu");
        setWindowFlags(Qt::Window | Qt::WindowTitleHint | Qt::CustomizeWindowHint | Qt::WindowStaysOnTopHint);
        username = user;
        codeArr = code;
        activityArr = activity;
        entryArr = entry;
        acceptArr = accept;
        frozen = froze;
        myDate = date;
        reportDate = myDate.left(7);

    }

menudialog::~menudialog() {
    delete ui;
}

void menudialog::on_pushButtonProject_clicked() {
    projectdialog * dialog = new projectdialog(this, username, codeArr, activityArr, entryArr, acceptArr, frozen, myDate);
    dialog -> open();
    connect(dialog, SIGNAL(updateMenu()), this, SLOT(refresh()));;
    close();
}

void menudialog::refresh() {

    emit updateMain();
}

void menudialog::on_pushButtonReport_clicked() {

}

void menudialog::on_pushButtonBack_clicked() {
    close();
}

void menudialog::on_pushButtonSubmit_clicked() {
    reportdialog * dialog = new reportdialog(this, username);

    if (dialog -> exec() == QDialog::Accepted) {
        emit updateMain();
        close();
    } else {
        close();
    }
}

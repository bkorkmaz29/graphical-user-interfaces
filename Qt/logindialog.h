#ifndef LOGINDIALOG_H
#define LOGINDIALOG_H

#include <QDialog>

#include "mainwindow.h"

namespace Ui {
    class logindialog;
}

class logindialog: public QDialog {
    Q_OBJECT

    public:
    explicit logindialog(QWidget * parent = nullptr);
    ~logindialog();

    const QString & getUsername() const;
    void setUsername(const QString & newUsername);

    private slots:
    void on_pushButton_clicked();

    void on_pushButton_2_clicked();

    private:
        Ui::logindialog * ui;
    QString username;
};

#endif // LOGINDIALOG_H

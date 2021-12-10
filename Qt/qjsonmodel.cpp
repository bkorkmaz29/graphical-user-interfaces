#include "qjsonmodel.h"

#include <QFile>

#include <QDebug>

#include <QFont>


QJsonTreeItem::QJsonTreeItem(QJsonTreeItem * parent) {
    mParent = parent;
}

QJsonTreeItem::~QJsonTreeItem() {
    qDeleteAll(mChilds);
}

void QJsonTreeItem::appendChild(QJsonTreeItem * item) {
    mChilds.append(item);
}

QJsonTreeItem * QJsonTreeItem::child(int row) {
    return mChilds.value(row);
}

QJsonTreeItem * QJsonTreeItem::parent() {
    return mParent;
}

int QJsonTreeItem::childCount() const {
    return mChilds.count();
}

int QJsonTreeItem::row() const {
    if (mParent)
        return mParent -> mChilds.indexOf(const_cast < QJsonTreeItem * > (this));

    return 0;
}

void QJsonTreeItem::setKey(const QString & key) {
    mKey = key;
}

void QJsonTreeItem::setValue(const QVariant & value) {
    mValue = value;
}

void QJsonTreeItem::setType(const QJsonValue::Type & type) {
    mType = type;
}

QString QJsonTreeItem::key() const {
    return mKey;
}

QVariant QJsonTreeItem::value() const {
    return mValue;
}

QJsonValue::Type QJsonTreeItem::type() const {
    return mType;
}

QJsonModel::QJsonModel(const QByteArray & json, QObject * parent): QAbstractItemModel(parent), mRootItem {
    new QJsonTreeItem
} {
    mHeaders.append("Entry");
    loadJson(json);
}

bool QJsonModel::loadJson(const QByteArray & json) {
    auto
    const & jdoc = QJsonDocument::fromJson(json);

    if (!jdoc.isNull()) {
        beginResetModel();
        delete mRootItem;
        if (jdoc.isArray()) {
            mRootItem = QJsonTreeItem::load(QJsonValue(jdoc.array()));
            mRootItem -> setType(QJsonValue::Array);

        } else {
            mRootItem = QJsonTreeItem::load(QJsonValue(jdoc.object()));
            mRootItem -> setType(QJsonValue::Object);
        }
        endResetModel();
        return true;
    }

    qDebug() << Q_FUNC_INFO << "cannot load json";
    return false;
}

QJsonTreeItem * QJsonTreeItem::load(const QJsonValue & value, QJsonTreeItem * parent) {
    QJsonTreeItem * rootItem = new QJsonTreeItem(parent);
    rootItem -> setKey("root");

    if (value.isObject()) {

        //Get all QJsonValue childs
        for (QString key: value.toObject().keys()) {
            QJsonValue v = value.toObject().value(key);
            QJsonTreeItem * child = load(v, rootItem);
            child -> setKey(key);
            child -> setType(v.type());
            rootItem -> appendChild(child);

        }

    } else if (value.isArray()) {
        //Get all QJsonValue childs
        int index = 0;
        for (QJsonValue v: value.toArray()) {

            QJsonTreeItem * child = load(v, rootItem);
            child -> setKey(QString::number(index + 1));
            child -> setType(v.type());
            rootItem -> appendChild(child);
            ++index;
        }
    } else {
        rootItem -> setValue(value.toVariant());
        rootItem -> setType(value.type());
    }

    return rootItem;
}

QJsonModel::QJsonModel(QObject * parent): QAbstractItemModel(parent), mRootItem {
    new QJsonTreeItem
} {
    mHeaders.append("Entry");

}

QJsonModel::~QJsonModel() {
    delete mRootItem;
}

QVariant QJsonModel::data(const QModelIndex & index, int role) const {

    if (!index.isValid())
        return QVariant();

    QJsonTreeItem * item = static_cast < QJsonTreeItem * > (index.internalPointer());

    if (role == Qt::DisplayRole) {

        if (index.column() == 0)
            return QString("%3").arg(item -> key());

        if (index.column() == 1)
            return item -> value();
    } else if (Qt::EditRole == role) {
        if (index.column() == 1) {
            return item -> value();
        }
    }

    return QVariant();

}

QVariant QJsonModel::headerData(int section, Qt::Orientation orientation, int role) const {
    if (role != Qt::DisplayRole)
        return QVariant();

    if (orientation == Qt::Horizontal) {

        return mHeaders.value(section);
    } else
        return QVariant();
}

QModelIndex QJsonModel::index(int row, int column,
    const QModelIndex & parent) const {
    if (!hasIndex(row, column, parent))
        return QModelIndex();

    QJsonTreeItem * parentItem;

    if (!parent.isValid())
        parentItem = mRootItem;
    else
        parentItem = static_cast < QJsonTreeItem * > (parent.internalPointer());

    QJsonTreeItem * childItem = parentItem -> child(row);
    if (childItem)
        return createIndex(row, column, childItem);
    else
        return QModelIndex();
}

QModelIndex QJsonModel::parent(const QModelIndex & index) const {
    if (!index.isValid())
        return QModelIndex();

    QJsonTreeItem * childItem = static_cast < QJsonTreeItem * > (index.internalPointer());
    QJsonTreeItem * parentItem = childItem -> parent();

    if (parentItem == mRootItem)
        return QModelIndex();

    return createIndex(parentItem -> row(), 0, parentItem);
}

int QJsonModel::rowCount(const QModelIndex & parent) const {
    QJsonTreeItem * parentItem;
    if (parent.column() > 0)
        return 0;

    if (!parent.isValid())
        parentItem = mRootItem;
    else
        parentItem = static_cast < QJsonTreeItem * > (parent.internalPointer());

    return parentItem -> childCount();
}

int QJsonModel::columnCount(const QModelIndex & parent) const {
    Q_UNUSED(parent)
    return 2;
}
